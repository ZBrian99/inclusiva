import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/auth'
import { updatePostSchema } from '@/lib/validation/post'
import { z } from 'zod'
import { parseISO, isValid } from 'date-fns'

const patchSchema = updatePostSchema

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAdmin(req)
  if (!auth.ok) return auth.res

  const { id } = await params
  const body = await req.json()
  const parsed = patchSchema.safeParse(body)
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

  // Update scalar fields
  const updated = await prisma.post.update({
    where: { id },
    data: {
      category: (input.category as any) ?? undefined,
      title: input.title,
      subtitle: input.subtitle,
      description: input.description,
      image: input.image,
      author: input.author,
      authorAvatar: input.authorAvatar,
      location: input.location,
      price: input.price,
      priceLabel: input.priceLabel,
      rating: input.rating,
      ratingCount: input.ratingCount,
      tags: input.tags ? { set: input.tags } : undefined,
      urgent: input.urgent,
      date: date && isValid(date) ? date : undefined,
      payment: input.payment ? { set: (input.payment as any) } : undefined,
      barterAccepted: input.barterAccepted,
      startDate: startDate && isValid(startDate) ? startDate : undefined,
      endDate: endDate && isValid(endDate) ? endDate : undefined,
      venue: (input as any).venue,
      mode: (input as any).mode,
      capacity: (input as any).capacity,
      organizer: (input as any).organizer,
      experienceYears: (input as any).experienceYears,
      availability: (input as any).availability,
      serviceArea: (input as any).serviceArea,
      condition: (input as any).condition,
      stock: (input as any).stock,
      warranty: (input as any).warranty,
      usageTime: (input as any).usageTime,
      duration: (input as any).duration,
      schedule: (input as any).schedule,
      level: (input as any).level,
      neededBy: (input as any).neededBy,
      budgetRange: (input as any).budgetRange,
      status: (input as any).status,
    },
  })

  // Replace socials if provided
  if (input.socials) {
    await prisma.$transaction([
      prisma.socialLink.deleteMany({ where: { postId: id } }),
      prisma.socialLink.createMany({ data: input.socials.map(s => ({ postId: id, name: s.name, url: s.url })) }),
    ])
  }

  return NextResponse.json({ data: updated })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAdmin(req)
  if (!auth.ok) return auth.res
  const { id } = await params
  await prisma.post.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
