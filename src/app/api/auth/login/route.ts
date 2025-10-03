import { NextRequest, NextResponse } from 'next/server'
import { signAdminJWT } from '@/lib/auth'

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

export async function POST(req: NextRequest) {
  // Accept credentials via Basic header OR JSON body
  let { user, pass } = getBasicCredentials(req)
  if (!user || !pass) {
    try {
      const body = await req.json().catch(() => ({}))
      user = body.username || body.user
      pass = body.password || body.pass
    } catch {
      // ignore
    }
  }

  if (!user || !pass) {
    return NextResponse.json({ error: 'Missing credentials' }, { status: 400 })
  }

  if (user !== process.env.ADMIN_USER || pass !== process.env.ADMIN_PASS) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
  }

  try {
    const token = signAdminJWT(user)
    const expiresIn = 2 * 60 * 60 // 2h
    const res = NextResponse.json({ token, tokenType: 'Bearer', expiresIn })
    // Set cookie for SSR validation
    res.cookies.set('adminToken', token, {
      httpOnly: true,
      maxAge: expiresIn,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
    return res
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 })
  }
}