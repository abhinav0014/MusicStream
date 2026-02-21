import { NextRequest, NextResponse } from 'next/server'
import { getIronSession } from 'iron-session'
import { sessionOptions, SessionData } from '@/lib/session'
import { verifyAdminCredentials } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 })
    }

    const isValid = await verifyAdminCredentials(username, password)

    if (!isValid) {
      // Simulate delay to prevent brute force
      await new Promise((r) => setTimeout(r, 1000))
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const response = NextResponse.json({ success: true })
    const session = await getIronSession<SessionData>(request, response, sessionOptions)
    session.isAdmin = true
    session.username = username
    await session.save()

    return response
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
