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
      webpack: (config, { isServer }) => {
        if (!isServer) {
          config.externals.push('canvas');
        }
    
        config.module.rules.push({
          test: /\.node$/,
          use: 'node-loader',
        });
    
        return config;
      },
      experimental: {
        serverExternalPackages: ['canvas']
      }
};

export default withNextIntl(nextConfig);;
