# 🎵 VIBE — Music Streaming App

A modern, full-stack music streaming web app built with **Next.js 14** (App Router), TypeScript, and Tailwind CSS. Features a dark, neon-cyberpunk aesthetic with an embedded YouTube player, admin dashboard, and secure server-side session auth.

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=<see step 3>
SESSION_SECRET=<random 32+ char string>
DATA_FILE_PATH=./data/songs.json
```

### 3. Hash your admin password

```bash
node scripts/hash-password.js yourpassword
```

Copy the output hash into `ADMIN_PASSWORD_HASH` in `.env.local`.

> **Default credentials** (pre-configured): `admin` / `admin123` — **change before deploying!**

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

```
music-app/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Homepage (SSR)
│   ├── globals.css             # Global styles + animations
│   ├── admin/
│   │   ├── page.tsx            # Admin login
│   │   └── dashboard/
│   │       └── page.tsx        # Admin dashboard (protected)
│   └── api/
│       ├── songs/route.ts      # Public songs API
│       ├── auth/route.ts       # Login API
│       └── admin/
│           ├── songs/route.ts  # Protected CRUD API
│           └── logout/route.ts # Logout API
├── components/
│   ├── HomePage.tsx            # Main homepage client component
│   ├── Header.tsx              # Sticky navigation header
│   ├── SongCard.tsx            # Song card with thumbnail + play
│   ├── PlayerSection.tsx       # YouTube iframe player
│   ├── AdminLoginPage.tsx      # Login form
│   ├── AdminDashboard.tsx      # Full admin dashboard
│   └── Toast.tsx               # Toast notifications
├── lib/
│   ├── songs.ts                # File-based song storage
│   ├── session.ts              # Iron-session config
│   └── auth.ts                 # Password verification
├── middleware.ts               # Route protection
├── data/
│   └── songs.json              # Song database (JSON file)
└── scripts/
    └── hash-password.js        # Password hashing utility
```

---

## 🎨 Features

### Public Homepage
- ✅ Server-Side Rendering (SSR) for fast initial load
- ✅ Responsive grid of song cards with YouTube thumbnails
- ✅ Embedded YouTube player with autoplay
- ✅ Real-time search/filter
- ✅ "NEW" badge for recently added songs
- ✅ "PLAYING" indicator with animated bars
- ✅ Toast notifications

### Admin Dashboard (`/admin`)
- ✅ Secure login with bcrypt-hashed password
- ✅ HTTP-only session cookies via iron-session
- ✅ Sidebar navigation
- ✅ Add song form with YouTube URL validation
- ✅ Song library table with thumbnails
- ✅ Delete functionality with confirmation
- ✅ Middleware-protected routes
- ✅ Logout functionality

### Security
- ✅ Passwords hashed with bcrypt (12 rounds)
- ✅ Session via HTTP-only, Secure cookies
- ✅ Middleware guards all `/admin/dashboard` and `/api/admin/*` routes
- ✅ Input sanitization on all API endpoints
- ✅ Credentials never exposed to client

---

## 🛠 Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 14 | Framework + App Router + SSR |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| iron-session | Secure session management |
| bcryptjs | Password hashing |
| Node.js fs | JSON file-based storage |
| Google Fonts | Syne (display) + DM Sans (body) |

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD_HASH`
   - `SESSION_SECRET`

> **Note**: Vercel's serverless functions have an ephemeral filesystem — the `data/songs.json` file won't persist between deployments. For production, consider replacing the file storage with a database like [PlanetScale](https://planetscale.com), [Supabase](https://supabase.com), or [Vercel KV](https://vercel.com/storage/kv).

### Self-Hosted (Node.js)

```bash
npm run build
npm start
```

---

## 🔧 Customization

### Change admin credentials

```bash
# Generate new hash
node scripts/hash-password.js newpassword

# Update .env.local
ADMIN_USERNAME=myadmin
ADMIN_PASSWORD_HASH=<new hash>
```

### Change session duration

Edit `lib/session.ts` → `cookieOptions.maxAge` (seconds)

### Add more songs programmatically

Edit `data/songs.json` directly (follow the existing format):

```json
{
  "id": "unique-id",
  "videoId": "youtube-video-id",
  "title": "Artist - Song",
  "addedAt": "2024-01-01T00:00:00.000Z"
}
```

---

## 🎯 API Reference

### Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/songs` | Get all songs |

### Admin (requires session)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth` | Login |
| `GET` | `/api/admin/songs` | Get all songs |
| `POST` | `/api/admin/songs` | Add song `{ url, title }` |
| `DELETE` | `/api/admin/songs?id=<id>` | Delete song |
| `POST` | `/api/admin/logout` | Logout |

---

## 📝 License

MIT
