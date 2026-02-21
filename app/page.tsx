import { getSongs } from '@/lib/songs'
import HomePage from '@/components/HomePage'

// Force SSR
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page() {
  const songs = getSongs()
  return <HomePage initialSongs={songs} />
}
