import type { NextConfig } from 'next';

/**
 * Next.js configuration for FlowPilot AI.
 * 
 * Key settings:
 * - Strict mode for catching React issues early
 * - Image domains for external content
 * - Environment variable exposure
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Expose backend URL to the browser
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  },

  // Allow images from external sources if needed
  images: {
    domains: ['avatars.githubusercontent.com', 'images.unsplash.com'],
  },

  // Transpile Framer Motion and React Flow for Next.js App Router
  transpilePackages: ['framer-motion'],
};

export default nextConfig;
