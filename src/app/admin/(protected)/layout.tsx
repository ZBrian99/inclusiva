import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createHmac } from 'crypto'
import React from 'react'

function base64url(input: Buffer | string): string {
  const b = Buffer.isBuffer(input) ? input : Buffer.from(input)
  return b.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function verifyJWT(token: string, secret: string): Record<string, any> | null {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const [headerPart, payloadPart, signaturePart] = parts
  const data = `${headerPart}.${payloadPart}`
  const expected = base64url(createHmac('sha256', secret).update(data).digest())
  if (expected !== signaturePart) return null
  try {
    const payload = JSON.parse(Buffer.from(payloadPart.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'))
    const now = Math.floor(Date.now() / 1000)
    if (payload.exp && typeof payload.exp === 'number' && payload.exp < now) return null
    return payload
  } catch {
    return null
  }
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const cookieToken = cookieStore.get('adminToken')?.value
  const secret = process.env.ADMIN_TOKEN_SECRET
  const hdrs = await headers()
  const authHeader = hdrs.get('authorization') || ''
  const headerToken = authHeader.startsWith('Bearer ') ? authHeader.substring('Bearer '.length).trim() : undefined

  const token = cookieToken || headerToken
  const ok = token && secret ? verifyJWT(token, secret) : null

  if (!ok) {
    redirect('/admin/login')
  }
  return <>{children}</>
}