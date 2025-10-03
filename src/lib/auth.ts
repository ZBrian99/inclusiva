import { NextRequest } from 'next/server'
import { createHmac } from 'crypto'

function base64url(input: Buffer | string): string {
  const b = Buffer.isBuffer(input) ? input : Buffer.from(input)
  return b.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function getBasicCredentials(req: NextRequest): { user?: string; pass?: string } {
  const header = req.headers.get('authorization')
  if (!header || !header.startsWith('Basic ')) return {}
  try {
    const decoded = Buffer.from(header.replace('Basic ', ''), 'base64').toString('utf8')
    const [user, pass] = decoded.split(':')
    return { user, pass }
  } catch {
    return {}
  }
}

function getBearerToken(req: NextRequest): string | undefined {
  const header = req.headers.get('authorization')
  if (!header || !header.startsWith('Bearer ')) return undefined
  return header.substring('Bearer '.length).trim()
}

function signJWT(payload: Record<string, any>, secret: string): string {
  const header = { alg: 'HS256', typ: 'JWT' }
  const headerPart = base64url(JSON.stringify(header))
  const payloadPart = base64url(JSON.stringify(payload))
  const data = `${headerPart}.${payloadPart}`
  const signature = createHmac('sha256', secret).update(data).digest()
  const signaturePart = base64url(signature)
  return `${data}.${signaturePart}`
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
    if (payload.exp && typeof payload.exp === 'number') {
      const now = Math.floor(Date.now() / 1000)
      if (payload.exp < now) return null
    }
    return payload
  } catch {
    return null
  }
}

export function signAdminJWT(user: string, opts?: { expiresInSec?: number }): string {
  const secret = process.env.ADMIN_TOKEN_SECRET
  if (!secret) throw new Error('Missing ADMIN_TOKEN_SECRET')
  const now = Math.floor(Date.now() / 1000)
  const exp = now + (opts?.expiresInSec ?? 2 * 60 * 60) // default 2h
  return signJWT({ sub: user, role: 'admin', iat: now, exp }, secret)
}

function isAdminBearer(req: NextRequest): boolean {
  const token = getBearerToken(req)
  if (!token) return false
  const secret = process.env.ADMIN_TOKEN_SECRET
  if (!secret) return false
  const payload = verifyJWT(token, secret)
  return !!payload && payload.role === 'admin'
}

export function isAdmin(req: NextRequest): boolean {
  const { user, pass } = getBasicCredentials(req)
  const basicOk = !!user && !!pass && user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS
  const bearerOk = isAdminBearer(req)
  return basicOk || bearerOk
}

export function requireAdmin(req: NextRequest): { ok: true } | { ok: false; res: Response } {
  if (isAdmin(req)) return { ok: true }
  return {
    ok: false,
    res: new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', 'WWW-Authenticate': 'Basic realm="admin", Bearer' },
    }),
  }
}