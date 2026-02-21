/** @type {import('next').NextConfig} */
const isProd = true;

// Replace 'your-repo-name' with your actual GitHub repository name
const repoName = "MusicStream";

const nextConfig = {
  // Required for GitHub Pages static export
  output: "export",

  // GitHub Pages serves from /<repo-name>/ so we need this basePath
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",

  images: {
    // Static export doesn't support next/image optimization
    // Use unoptimized so img tags work on GitHub Pages
    unoptimized: true,
    domains: ["img.youtube.com", "i.ytimg.com"],
  },

  trailingSlash: true,
};

module.exports = nextConfig;
