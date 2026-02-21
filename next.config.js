/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for GitHub Pages static export
  output: "default",

  // GitHub Pages serves from /<repo-name>/ so we need this basePath
  basePath:  "",
  assetPrefix: "",
  images: {
    // Static export doesn't support next/image optimization
    // Use unoptimized so img tags work on GitHub Pages
    unoptimized: true,
    domains: ["img.youtube.com", "i.ytimg.com"],
  },

  trailingSlash: true,
};

module.exports = nextConfig;
