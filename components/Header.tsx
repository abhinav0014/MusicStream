'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full"
      style={{ background: 'rgba(8, 8, 16, 0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center relative"
              style={{ background: 'linear-gradient(135deg, #7b2fff, #00f5d4)' }}>
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white">
              VIBE
            </span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm font-body text-slate-400 hover:text-white transition-colors">
              Discover
            </Link>
            <Link href="/admin"
              className="text-sm font-body px-4 py-1.5 rounded-full transition-all"
              style={{ background: 'rgba(123,47,255,0.15)', border: '1px solid rgba(123,47,255,0.3)', color: '#a78bfa' }}>
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
