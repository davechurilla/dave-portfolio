import type {NextConfig} from 'next'
import {sanity} from 'next-sanity/live/cache-life'

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  cacheLife: {default: sanity},
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [{protocol: 'https', hostname: 'cdn.sanity.io'}],
  },  
} satisfies NextConfig

export default nextConfig;
