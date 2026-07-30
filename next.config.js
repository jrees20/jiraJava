/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['ts', 'tsx'],
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  eslint: {
    dirs: ['src', 'pages', 'components', 'lib', 'utils'],
  },
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig
