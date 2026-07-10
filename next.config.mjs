/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const allowedOrigin = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    
    return [
      {
        source: "/api/:path*",
        headers: [
          { 
            key: "Access-Control-Allow-Origin", 
            value: allowedOrigin 
          },
          { 
            key: "Access-Control-Allow-Credentials", 
            value: "true" 
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization, Cookie, Set-Cookie",
          },
        ],
      },
    ];
  },
};

export default nextConfig;