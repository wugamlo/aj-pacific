/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better error detection
  reactStrictMode: true,
  
  // Use SWC minification for better performance
  swcMinify: true,
  
  // Transpile specific packages if needed
  transpilePackages: [],
  
  // Optimize for production
  poweredByHeader: false,
  
  // Ensure proper handling of client components
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Generate unique build IDs to force cache invalidation
  generateBuildId: async () => {
    // Use timestamp to ensure every build has a unique ID
    return `build-${Date.now()}`;
  },

  // Configure headers for proper cache control
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
        ],
      },
      {
        // Special handling for Next.js static files
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Handle images and public assets
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
