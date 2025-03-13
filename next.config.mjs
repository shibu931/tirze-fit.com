/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "tirzepatyd.store", 
          },
        ],
      },
};

export default nextConfig;
