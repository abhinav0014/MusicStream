import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export interface Song {
  id: string
  videoId: string
  title: string
  addedAt: string
}

const DATA_FILE = path.join(process.cwd(), 'data', 'songs.json')

function ensureDataFile(): void {
  const dir = path.dirname(DATA_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf-8')
  }
}

export function getSongs(): Song[] {
  ensureDataFile()
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(raw) as Song[]
  } catch {
    return []
  }
}

export function addSong(videoId: string, title: string): Song {
  const songs = getSongs()
  const newSong: Song = {
    id: uuidv4(),
    videoId,
    title: title.trim(),
    addedAt: new Date().toISOString(),
  }
  songs.unshift(newSong)
  fs.writeFileSync(DATA_FILE, JSON.stringify(songs, null, 2), 'utf-8')
  return newSong
}

export function deleteSong(id: string): boolean {
  const songs = getSongs()
  const filtered = songs.filter((s) => s.id !== id)
  if (filtered.length === songs.length) return false
  fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8')
  return true
}

export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}
