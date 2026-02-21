import { redirect } from 'next/navigation'
import { getSession } from '@/lib/session'
import { getSongs } from '@/lib/songs'
import AdminDashboard from '@/components/AdminDashboard'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Dashboard — VIBE Admin',
}

export default async function DashboardPage() {
  const session = await getSession()

  if (!session.isAdmin) {
    redirect('/admin')
  }

  const songs = getSongs()
  return <AdminDashboard initialSongs={songs} />
}
