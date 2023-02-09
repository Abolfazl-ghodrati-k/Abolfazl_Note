/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  serverRuntimeConfig:{
     secret: "degrjgniuwreghnrwg%^&%#&^%*#%^645756%^&",
     mongo_uri: process.env.MONGODB_URI
  },
  publicRuntimeConfig: {
    apiUrl: "http://localhost:3000/api"
  },
  env: {
    secret: "degrjgniuwreghnrwg%^&%#&^%*#%^645756%^&",
    apiUrl: "http://localhost:3000/api"
  }
  
}

module.exports = nextConfig