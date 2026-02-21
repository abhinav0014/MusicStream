import { NextRequest, NextResponse } from 'next/server'
import { addSong, deleteSong, getSongs, extractYouTubeId } from '@/lib/songs'

export async function GET() {
  try {
    const songs = getSongs()
    return NextResponse.json(songs)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch songs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { url, title } = body

    if (!url || !title) {
      return NextResponse.json({ error: 'URL and title are required' }, { status: 400 })
    }

    const videoId = extractYouTubeId(url.trim())
    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube URL or video ID' }, { status: 400 })
    }

    const cleanTitle = title.trim().slice(0, 200)
    if (!cleanTitle) {
      return NextResponse.json({ error: 'Title cannot be empty' }, { status: 400 })
    }

    const song = addSong(videoId, cleanTitle)
    return NextResponse.json(song, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add song' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Song ID required' }, { status: 400 })
    }

    const deleted = deleteSong(id)
    if (!deleted) {
      return NextResponse.json({ error: 'Song not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete song' }, { status: 500 })
  }
}
