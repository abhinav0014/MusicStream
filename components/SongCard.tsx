'use client'

import { Song } from '@/lib/songs'

interface SongCardProps {
  song: Song
  isPlaying: boolean
  isNew: boolean
  onPlay: () => void
}

export default function SongCard({ song, isPlaying, isNew, onPlay }: SongCardProps) {
  const thumbnail = `https://img.youtube.com/vi/${song.videoId}/mqdefault.jpg`

  return (
    <div
      className={`song-card card-glass rounded-2xl overflow-hidden cursor-pointer group relative ${
        isPlaying ? 'ring-1 ring-cyan-400' : ''
      }`}
      style={isPlaying ? { boxShadow: '0 0 30px rgba(0,245,212,0.15)' } : {}}
      onClick={onPlay}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnail}
          alt={song.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Play button overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          {isPlaying ? (
            // Playing animation
            <div className="flex items-end gap-0.5 h-8">
              {[0, 1, 2, 3].map((i) => (
                <div key={i}
                  className="playing-bar w-1 rounded-full"
                  style={{ background: '#00f5d4', minHeight: '4px' }} />
              ))}
            </div>
          ) : (
            <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ background: 'rgba(0,245,212,0.9)', backdropFilter: 'blur(10px)' }}>
              <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {isNew && (
            <span className="text-xs font-display font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,45,120,0.9)', color: 'white' }}>
              NEW
            </span>
          )}
          {isPlaying && (
            <span className="text-xs font-display font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(0,245,212,0.9)', color: '#000' }}>
              PLAYING
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="font-body text-sm text-slate-200 leading-snug line-clamp-2 group-hover:text-white transition-colors">
          {song.title}
        </h3>
        <p className="text-xs text-slate-600 mt-1 font-body">
          {new Date(song.addedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
    </div>
  )
}
