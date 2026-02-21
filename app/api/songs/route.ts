import { NextResponse } from 'next/server'
import { getSongs } from '@/lib/songs'

export async function GET() {
  try {
    const songs = getSongs()
    return NextResponse.json(songs)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch songs' }, { status: 500 })
  }
}
