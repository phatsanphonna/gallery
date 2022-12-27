/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['drive.google.com', 'lh3.google.com', 'doc-0c-5k-docs.googleusercontent.com']
  },
}

module.exports = nextConfig
