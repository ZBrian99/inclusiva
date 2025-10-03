import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAdmin } from '@/lib/auth'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const post = await prisma.post.findUnique({ where: { id }, include: { socials: true } })
    if (!post) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    // Only admins can see non-approved
    const admin = isAdmin(req)
    if (!admin && post.status !== 'approved') {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json({ data: post })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}