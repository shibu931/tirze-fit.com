/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "tirzepatyd.store", 
          },
          {
            protocol: "https",
            hostname: "tirze-fit.com", 
          },
        ],
      },
};

export default withNextIntl(nextConfig);;
