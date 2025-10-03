import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { buildPostWhere, resolveOrderBy, type SortKey } from '@/lib/filters/postWhere'
import { requireAdmin } from '@/lib/auth'
import { postSchema } from '@/lib/validation/post'
import { parseISO, isValid } from 'date-fns'

export async function GET(req: NextRequest) {
  const auth = requireAdmin(req)
  if (!auth.ok) return auth.res

  const sp = req.nextUrl.searchParams
  const page = Math.max(parseInt(sp.get('page') ?? '1', 10) || 1, 1)
  const pageSize = Math.min(Math.max(parseInt(sp.get('pageSize') ?? '12', 10) || 12, 1), 100)
  const q = sp.get('q') ?? undefined
  const category = sp.get('category') ?? undefined
  const urgent = sp.get('urgent') === 'true' ? true : sp.get('urgent') === 'false' ? false : undefined
  const minPrice = sp.get('minPrice') ? Number(sp.get('minPrice')) : undefined
  const maxPrice = sp.get('maxPrice') ? Number(sp.get('maxPrice')) : undefined
  const mode = (sp.get('mode') as 'presencial' | 'online' | 'hibrido') ?? undefined
  const status = (sp.get('status') as 'pending' | 'approved' | 'rejected') ?? undefined
  const sort = (sp.get('sort') as SortKey) ?? 'recent'

  const where = buildPostWhere({ q, category, urgent, minPrice, maxPrice, mode, status }, { includeNonApproved: true })
  const orderBy = resolveOrderBy(sort)

  const [total, data] = await Promise.all([
    prisma.post.count({ where }),
    prisma.post.findMany({ where, orderBy, skip: (page - 1) * pageSize, take: pageSize }),
  ])
  const totalPages = Math.ceil(total / pageSize) || 1

  return NextResponse.json({
    data,
    pagination: {
      page,
      pageSize,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  })
}

export async function POST(req: NextRequest) {
  const auth = requireAdmin(req)
  if (!auth.ok) return auth.res

  const body = await req.json()
  const parsed = postSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }
  const input = parsed.data

  const dateStr = (input as any).date as string | undefined
  const date = dateStr ? parseISO(dateStr) : undefined
  const startDateStr = (input as any).startDate as string | undefined
  const endDateStr = (input as any).endDate as string | undefined
  const startDate = startDateStr ? parseISO(startDateStr) : undefined
  const endDate = endDateStr ? parseISO(endDateStr) : undefined

  // Construir payload limpio por categoría y aplicar defaults
  const baseData = {
    category: input.category as any,
    title: input.title,
    subtitle: input.subtitle,
    description: input.description,
    image: input.image,
    author: input.author,
    authorAvatar: input.authorAvatar,
    location: input.location,
    price: input.price ?? null,
    priceLabel: input.priceLabel,
    rating: input.rating ?? null,
    ratingCount: input.ratingCount ?? null,
    tags: input.tags ?? [],
    urgent: input.urgent ?? false,
    // Fecha de publicación automática
    date: new Date(),
    payment: (input.payment ?? []) as any,
    barterAccepted: input.barterAccepted ?? false,
    status: 'pending' as any,
  }

  let categoryData: Record<string, any> = {}
  switch (input.category) {
    case 'eventos': {
      categoryData = {
        startDate: startDate && isValid(startDate) ? startDate : new Date(),
        endDate: endDate && isValid(endDate) ? endDate : null,
        venue: (input as any).venue,
        mode: (input as any).mode,
        capacity: (input as any).capacity ?? null,
        organizer: (input as any).organizer,
      }
      break
    }
    case 'servicios': {
      categoryData = {
        experienceYears: (input as any).experienceYears ?? null,
        availability: (input as any).availability,
        serviceArea: (input as any).serviceArea,
      }
      break
    }
    case 'productos': {
      categoryData = {
        condition: (input as any).condition,
        stock: (input as any).stock ?? null,
        warranty: (input as any).warranty,
      }
      break
    }
    case 'usados': {
      categoryData = {
        condition: 'usado' as any,
        usageTime: (input as any).usageTime,
      }
      break
    }
    case 'cursos': {
      categoryData = {
        mode: (input as any).mode,
        duration: (input as any).duration,
        schedule: (input as any).schedule,
        level: (input as any).level,
      }
      break
    }
    case 'pedidos': {
      categoryData = {
        neededBy: (input as any).neededBy,
        budgetRange: (input as any).budgetRange,
      }
      break
    }
  }

  const created = await prisma.post.create({
    data: {
      ...baseData,
      ...categoryData,
      socials: input.socials && input.socials.length > 0 ? {
        create: input.socials.map(s => ({ name: s.name, url: s.url }))
      } : undefined,
    },
  })

  return NextResponse.json({ data: created }, { status: 201 })
}