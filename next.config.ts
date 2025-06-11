import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:[
      {hostname:"victoriabuzz.com"}
    ]
  },
  allowedDevOrigins: ['kdtminiproject.myvnc.com'],
};



export default nextConfig;
