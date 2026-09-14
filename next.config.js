const withMDX = require('@next/mdx')()
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  async rewrites() {
    return [{ source: '/', destination: '/cn' }]
  },
  async redirects() {
    return [
      {
        source: '/:lang(cn|eng)/photos',
        destination: '/:lang',
        permanent: true,
      },
      {
        source: '/:lang(cn|eng)/photos/:path*',
        destination: '/:lang',
        permanent: true,
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
}
 
module.exports = withMDX(nextConfig)