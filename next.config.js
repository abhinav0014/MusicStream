/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.youtube.com', 'i.ytimg.com'],
  },
  // Enable SSR for all pages by default
  experimental: {},
}

module.exports = nextConfig
