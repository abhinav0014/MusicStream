import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VIBE — Music Streaming',
  description: 'Discover and play curated music on VIBE, your personal YouTube music streaming platform.',
  keywords: ['music', 'streaming', 'youtube', 'playlist'],
  openGraph: {
    title: 'VIBE — Music Streaming',
    description: 'Discover and play curated music on VIBE.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="noise-bg gradient-mesh min-h-screen">
        {children}
      </body>
    </html>
  )
}
