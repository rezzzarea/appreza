import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[{
      hostname:"cdn.prod.website-files.com"
    },
    {hostname:"ik.imagekit.io"},
    {hostname:"riwaqalquran.com"},
    {
      hostname:"wadimubarak.com",
      protocol:"https",
    },
    {
      hostname:"tajdeed.id",
      protocol:"https",
    },
    ]
  }
};

export default nextConfig;
