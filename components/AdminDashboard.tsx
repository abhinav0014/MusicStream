'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Song } from '@/lib/songs'

interface AdminDashboardProps {
  initialSongs: Song[]
}

type ToastType = { message: string; type: 'success' | 'error' } | null

export default function AdminDashboard({ initialSongs }: AdminDashboardProps) {
  const router = useRouter()
  const [songs, setSongs] = useState<Song[]>(initialSongs)
  const [form, setForm] = useState({ url: '', title: '' })
  const [loading, setLoading] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [toast, setToast] = useState<ToastType>(null)
  const [activeTab, setActiveTab] = useState<'add' | 'list'>('add')
  const [search, setSearch] = useState('')

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
    router.refresh()
  }

  const handleAddSong = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.url.trim() || !form.title.trim()) return
    setLoading(true)

    try {
      const res = await fetch('/api/admin/songs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        showToast(data.error || 'Failed to add song', 'error')
        return
      }

      setSongs((prev) => [data, ...prev])
      setForm({ url: '', title: '' })
      showToast('Song added successfully!')
      setActiveTab('list')
    } catch {
      showToast('Network error. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeleteId(id)
    try {
      const res = await fetch(`/api/admin/songs?id=${id}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        showToast(data.error || 'Failed to delete', 'error')
        return
      }
      setSongs((prev) => prev.filter((s) => s.id !== id))
      showToast('Song deleted.')
    } catch {
      showToast('Network error.', 'error')
    } finally {
      setDeleteId(null)
    }
  }

  const filteredSongs = songs.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen flex relative z-10">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 flex flex-col"
        style={{ background: 'rgba(14,14,26,0.95)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
        {/* Logo */}
        <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #7b2fff, #00f5d4)' }}>
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
            <div>
              <p className="font-display font-bold text-white text-lg leading-none">VIBE</p>
              <p className="text-xs text-slate-500 font-body">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <p className="text-xs font-display font-semibold text-slate-600 uppercase tracking-widest px-3 py-2">
            Management
          </p>
          <button
            onClick={() => setActiveTab('add')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body transition-all ${
              activeTab === 'add'
                ? 'text-black font-medium'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            style={activeTab === 'add' ? { background: '#00f5d4' } : {}}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Song
          </button>

          <button
            onClick={() => setActiveTab('list')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body transition-all ${
              activeTab === 'list'
                ? 'text-black font-medium'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
            style={activeTab === 'list' ? { background: '#00f5d4' } : {}}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            Song Library
            <span className="ml-auto text-xs px-1.5 py-0.5 rounded-md font-display"
              style={activeTab === 'list' ? { background: 'rgba(0,0,0,0.2)' } : { background: 'rgba(255,255,255,0.08)', color: '#94a3b8' }}>
              {songs.length}
            </span>
          </button>

          <div className="pt-4">
            <a href="/" target="_blank" rel="noopener"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Site
            </a>
          </div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-white">
              {activeTab === 'add' ? 'Add New Song' : 'Song Library'}
            </h1>
            <p className="text-slate-500 font-body text-sm mt-1">
              {activeTab === 'add'
                ? 'Paste a YouTube URL to add a song to your library'
                : `Manage your ${songs.length} song${songs.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          {/* Add Song Form */}
          {activeTab === 'add' && (
            <div className="rounded-3xl p-8 animate-fade-in"
              style={{ background: 'rgba(14,14,26,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <form onSubmit={handleAddSong} className="space-y-5">
                <div>
                  <label className="block text-xs font-display font-semibold text-slate-400 uppercase tracking-widest mb-2">
                    YouTube URL or Video ID
                  </label>
                  <input
                    type="text"
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    required
                    placeholder="https://youtube.com/watch?v=... or video ID"
                    className="w-full px-4 py-3 rounded-xl text-sm font-body text-slate-200 placeholder-slate-600 transition-all"
                    style={{ background: 'rgba(8,8,16,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                  <p className="text-xs text-slate-600 mt-1.5 font-body">
                    Supports: youtube.com/watch?v=, youtu.be/, or raw 11-char video ID
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-display font-semibold text-slate-400 uppercase tracking-widest mb-2">
                    Song Title
                  </label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    maxLength={200}
                    placeholder="Artist - Song Name"
                    className="w-full px-4 py-3 rounded-xl text-sm font-body text-slate-200 placeholder-slate-600 transition-all"
                    style={{ background: 'rgba(8,8,16,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={loading || !form.url || !form.title}
                    className="px-6 py-3 rounded-xl font-display font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #7b2fff, #00f5d4)', color: 'white' }}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Adding...
                      </span>
                    ) : '+ Add Song'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ url: '', title: '' })}
                    className="px-4 py-3 rounded-xl text-sm font-body text-slate-400 hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Song List */}
          {activeTab === 'list' && (
            <div className="animate-fade-in space-y-4">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search songs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-input w-full pl-11 pr-4 py-3 rounded-xl text-sm text-slate-200 placeholder-slate-500 font-body"
                />
              </div>

              {/* Table */}
              <div className="rounded-2xl overflow-hidden"
                style={{ background: 'rgba(14,14,26,0.9)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <table className="w-full">
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <th className="text-left px-6 py-4 text-xs font-display font-semibold text-slate-500 uppercase tracking-widest">
                        Thumbnail
                      </th>
                      <th className="text-left px-4 py-4 text-xs font-display font-semibold text-slate-500 uppercase tracking-widest">
                        Title
                      </th>
                      <th className="text-left px-4 py-4 text-xs font-display font-semibold text-slate-500 uppercase tracking-widest hidden md:table-cell">
                        Added
                      </th>
                      <th className="text-right px-6 py-4 text-xs font-display font-semibold text-slate-500 uppercase tracking-widest">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSongs.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-16 text-slate-600 font-body">
                          {search ? 'No songs match your search.' : 'No songs yet. Add your first song!'}
                        </td>
                      </tr>
                    ) : filteredSongs.map((song, idx) => (
                      <tr key={song.id}
                        className="transition-colors hover:bg-white/[0.02]"
                        style={{ borderBottom: idx < filteredSongs.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
                        <td className="px-6 py-4">
                          <img
                            src={`https://img.youtube.com/vi/${song.videoId}/default.jpg`}
                            alt={song.title}
                            className="w-16 h-12 object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm font-body text-slate-200 line-clamp-2">{song.title}</p>
                          <p className="text-xs text-slate-600 mt-0.5 font-body">ID: {song.videoId}</p>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <p className="text-xs text-slate-500 font-body">
                            {new Date(song.addedAt).toLocaleDateString('en-US', {
                              month: 'short', day: 'numeric', year: 'numeric'
                            })}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDelete(song.id)}
                            disabled={deleteId === song.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-all disabled:opacity-50"
                            style={{ background: 'rgba(255,45,120,0.1)', color: '#ff2d78', border: '1px solid rgba(255,45,120,0.2)' }}
                          >
                            {deleteId === song.id ? (
                              <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                              </svg>
                            ) : (
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 toast-in"
          onClick={() => setToast(null)}>
          <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-body shadow-2xl cursor-pointer`}
            style={toast.type === 'success'
              ? { background: '#00f5d4', color: '#000', boxShadow: '0 0 30px rgba(0,245,212,0.3)' }
              : { background: '#ff2d78', color: '#fff', boxShadow: '0 0 30px rgba(255,45,120,0.3)' }
            }>
            <span>{toast.type === 'success' ? '✓' : '✕'}</span>
            <span className="font-medium">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  )
}
