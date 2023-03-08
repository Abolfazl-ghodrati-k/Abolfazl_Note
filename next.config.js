/**
 * @type {import('next').NextConfig}
 */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
});

const nextConfig = withPWA({
  /* config options here */
  serverRuntimeConfig: {
    secret: process.env.JWT_SECRET,
    mongo_uri: process.env.MONGODB_URI,
  },
  publicRuntimeConfig: {
    apiUrl: "http://localhost:3000/api",
  },
  env: {
    secret: process.env.JWT_SECRET,
    apiUrl: "http://localhost:3000/api",
  },
});

module.exports = nextConfig;
