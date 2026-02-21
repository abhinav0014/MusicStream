'use client'

import { Song } from '@/lib/songs'

interface PlayerSectionProps {
  song: Song
  onClose: () => void
}

export default function PlayerSection({ song, onClose }: PlayerSectionProps) {
  return (
    <div className="animate-slide-up rounded-3xl overflow-hidden relative"
      style={{ background: 'rgba(14,14,26,0.95)', border: '1px solid rgba(0,245,212,0.2)', boxShadow: '0 0 60px rgba(0,245,212,0.08)' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-3 min-w-0">
          {/* Animated bars */}
          <div className="flex items-end gap-0.5 h-5 flex-shrink-0">
            {[0, 1, 2, 3].map((i) => (
              <div key={i}
                className="playing-bar w-1 rounded-full"
                style={{ background: '#00f5d4', minHeight: '3px' }} />
            ))}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-500 font-display uppercase tracking-widest">Now Playing</p>
            <h2 className="font-display font-bold text-white truncate">{song.title}</h2>
          </div>
        </div>

        <button onClick={onClose}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* YouTube iframe */}
      <div className="aspect-video w-full max-h-[480px]">
        <iframe
          key={song.videoId}
          src={`https://www.youtube.com/embed/${song.videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={song.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          style={{ border: 'none' }}
        />
      </div>
    </div>
  )
}
