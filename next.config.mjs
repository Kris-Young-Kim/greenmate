/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  turbopack: {},
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.swgreen.shop" }],
        destination: "https://swgreen.shop/:path*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
