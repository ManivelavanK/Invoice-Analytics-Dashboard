/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'standalone',
  env: {
    API_URL: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api` : 'http://localhost:3001'
  }
}

module.exports = nextConfig