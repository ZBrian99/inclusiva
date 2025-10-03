import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { postSchema } from '@/lib/validation/post'
import { parseISO, isValid } from 'date-fns'
import { buildPostWhere, resolveOrderBy, type SortKey } from '@/lib/filters/postWhere'

function toApiPost(p: any) {
  return {
    id: p.id,
    category: p.category,
    title: p.title,
    subtitle: p.subtitle ?? undefined,
    description: p.description,
    image: p.image,
    author: p.author,
    authorAvatar: p.authorAvatar ?? undefined,
    location: p.location,
    price: typeof p.price === 'number' ? p.price : undefined,
    priceLabel: p.priceLabel ?? undefined,
    rating: typeof p.rating === 'number' ? p.rating : undefined,
    ratingCount: typeof p.ratingCount === 'number' ? p.ratingCount : undefined,
    tags: Array.isArray(p.tags) ? p.tags : undefined,
    urgent: !!p.urgent,
    // Fecha de publicación
    date: p.date ? new Date(p.date).toISOString() : new Date().toISOString(),
    status: p.status,
    socials: (p.socials ?? []).map((s: any) => ({ name: s.name, url: s.url })),
    payment: Array.isArray(p.payment) ? p.payment : undefined,
    barterAccepted: !!p.barterAccepted,

    // Evento
    startDate: p.startDate ? new Date(p.startDate).toISOString() : undefined,
    endDate: p.endDate ? new Date(p.endDate).toISOString() : undefined,
    venue: p.venue ?? undefined,
    mode: p.mode ?? undefined,
    capacity: typeof p.capacity === 'number' ? p.capacity : undefined,
    organizer: p.organizer ?? undefined,

    // Servicio
    experienceYears: typeof p.experienceYears === 'number' ? p.experienceYears : undefined,
    availability: p.availability ?? undefined,
    serviceArea: p.serviceArea ?? undefined,

    // Producto
    condition: p.condition ?? undefined,
    stock: typeof p.stock === 'number' ? p.stock : undefined,
    warranty: p.warranty ?? undefined,

    // Usado
    usageTime: p.usageTime ?? undefined,

    // Curso
    duration: p.duration ?? undefined,
    schedule: p.schedule ?? undefined,
    level: p.level ?? undefined,

    // Pedido
    neededBy: p.neededBy ?? undefined,
    budgetRange: p.budgetRange ?? undefined,
  }
}

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams
    const page = Math.max(parseInt(sp.get('page') ?? '1', 10) || 1, 1)
    const pageSize = Math.min(Math.max(parseInt(sp.get('pageSize') ?? '12', 10) || 12, 1), 100)
    const q = sp.get('q') ?? undefined
    const category = sp.get('category') ?? undefined
    const sort = (sp.get('sort') as SortKey) ?? 'recent'

    // Público: sólo publicaciones aprobadas por defecto
    const where = buildPostWhere({ q, category })
    const orderBy = resolveOrderBy(sort)

    const [total, rows] = await Promise.all([
      prisma.post.count({ where }),
      prisma.post.findMany({ where, orderBy, skip: (page - 1) * pageSize, take: pageSize, include: { socials: true } }),
    ])
    const totalPages = Math.ceil(total / pageSize) || 1

    return new Response(
      JSON.stringify({
        data: rows.map(toApiPost),
        pagination: {
          page,
          pageSize,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )
  } catch (e: any) {
    const msg = e?.message ?? 'Failed to fetch posts'
    return new Response(JSON.stringify({ error: msg }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const input = postSchema.parse(json)

    // Construir payload limpio según categoría
    const baseData = {
      category: input.category as any,
      title: input.title,
      subtitle: input.subtitle ?? null,
      description: input.description,
      image: input.image,
      author: input.author,
      authorAvatar: input.authorAvatar ?? null,
      location: input.location,
      price: typeof input.price === 'number' ? input.price : null,
      priceLabel: input.priceLabel ?? null,
      rating: typeof input.rating === 'number' ? input.rating : null,
      ratingCount: typeof input.ratingCount === 'number' ? input.ratingCount : null,
      tags: input.tags ?? [],
      urgent: !!input.urgent,
      // Fecha de publicación automática
      date: new Date(),
      payment: ((input as any).payment ?? []) as any,
      barterAccepted: !!(input as any).barterAccepted,
      status: 'pending' as any,
    } as const

    let categoryData: Record<string, any> = {}

    switch (input.category) {
      case 'eventos': {
        const startDate = parseISO((input as any).startDate)
        const endDateStr = (input as any).endDate as string | undefined
        const endDate = endDateStr ? parseISO(endDateStr) : undefined
        categoryData = {
          startDate: isValid(startDate) ? startDate : new Date(),
          endDate: endDate && isValid(endDate) ? endDate : null,
          venue: (input as any).venue ?? null,
          mode: (input as any).mode as any,
          capacity: typeof (input as any).capacity === 'number' ? (input as any).capacity : null,
          organizer: (input as any).organizer ?? null,
        }
        break
      }
      case 'servicios': {
        categoryData = {
          experienceYears: typeof (input as any).experienceYears === 'number' ? (input as any).experienceYears : null,
          availability: (input as any).availability ?? null,
          serviceArea: (input as any).serviceArea ?? null,
        }
        break
      }
      case 'productos': {
        categoryData = {
          condition: (input as any).condition as any,
          stock: typeof (input as any).stock === 'number' ? (input as any).stock : null,
          warranty: (input as any).warranty ?? null,
        }
        break
      }
      case 'usados': {
        categoryData = {
          condition: 'usado' as any,
          usageTime: (input as any).usageTime ?? null,
        }
        break
      }
      case 'cursos': {
        categoryData = {
          mode: (input as any).mode as any,
          duration: (input as any).duration ?? null,
          schedule: (input as any).schedule ?? null,
          level: (input as any).level as any,
        }
        break
      }
      case 'pedidos': {
        categoryData = {
          neededBy: (input as any).neededBy ?? null,
          budgetRange: (input as any).budgetRange ?? null,
        }
        break
      }
    }

    const created = await prisma.post.create({
      data: {
        ...baseData,
        ...categoryData,
        socials: input.socials && input.socials.length > 0 ? {
          create: input.socials.map((s) => ({ name: s.name, url: s.url }))
        } : undefined,
      },
      include: { socials: true },
    })

    return new Response(JSON.stringify({ data: toApiPost(created) }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e: any) {
    const msg = e?.message ?? 'Invalid request'
    return new Response(JSON.stringify({ error: msg }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
