import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
  // cacheComponents: true,
  // partialPrefetching: true,
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  images: {
    dangerouslyAllowLocalIP : true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        // Placeholder images — remove once Sanity data is wired up
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
