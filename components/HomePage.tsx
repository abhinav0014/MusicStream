'use client'

import { useState, useMemo } from 'react'
import { Song } from '@/lib/songs'
import SongCard from './SongCard'
import PlayerSection from './PlayerSection'
import Header from './Header'
import Toast from './Toast'

interface HomePageProps {
  initialSongs: Song[]
}

export default function HomePage({ initialSongs }: HomePageProps) {
  const [songs] = useState<Song[]>(initialSongs)
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const filtered = useMemo(() => {
    if (!search.trim()) return songs
    const q = search.toLowerCase()
    return songs.filter((s) => s.title.toLowerCase().includes(q))
  }, [songs, search])

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3500)
  }

  const handlePlay = (song: Song) => {
    setCurrentSong(song)
    showToast(`Now playing: ${song.title}`)
  }

  return (
    <div className="relative min-h-screen z-10">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Hero */}
        <section className="pt-20 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-display font-semibold tracking-widest uppercase"
            style={{ background: 'rgba(0,245,212,0.08)', border: '1px solid rgba(0,245,212,0.2)', color: '#00f5d4' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
            {songs.length} tracks available
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight mb-4"
            style={{ background: 'linear-gradient(135deg, #fff 0%, rgba(0,245,212,0.9) 50%, rgba(123,47,255,0.8) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            YOUR SONIC<br />UNIVERSE
          </h1>
          <p className="text-slate-400 font-body text-lg max-w-md mx-auto">
            Curated beats, zero noise. Play anything.
          </p>
        </section>

        {/* Player */}
        {currentSong && (
          <section className="mb-12">
            <PlayerSection song={currentSong} onClose={() => setCurrentSong(null)} />
          </section>
        )}

        {/* Search */}
        <div className="mb-8 relative max-w-lg mx-auto">
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
            className="search-input w-full pl-11 pr-4 py-3 rounded-2xl text-sm text-slate-200 placeholder-slate-500 font-body"
          />
          {search && (
            <button onClick={() => setSearch('')}
              className="absolute inset-y-0 right-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Songs Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎵</div>
            <p className="text-slate-500 font-display text-xl">
              {search ? 'No songs match your search.' : 'No songs yet. Check back soon!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((song, idx) => (
              <SongCard
                key={song.id}
                song={song}
                isPlaying={currentSong?.id === song.id}
                isNew={idx < 3 && !search}
                onPlay={() => handlePlay(song)}
              />
            ))}
          </div>
        )}
      </main>

      {toast && (
        <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />
      )}
    </div>
  )
}
