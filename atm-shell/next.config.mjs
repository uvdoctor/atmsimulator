/** @type {import('next').NextConfig} */
import withNextIntl from 'next-intl/plugin';
import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const nextConfig = {
  reactStrictMode: true,
  webpack: function(config, {isServer}) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'shell',
        remotes: {
          balance: `balance@http://localhost:3001/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        },
        filename: 'static/chunks/remoteEntry.js',
        exposes: {},
        shared: {
          // whatever else
        },
        extraOptions: {
          exposePages: true, // `false` by default
          enableImageLoaderFix: true, // `false` by default
          enableUrlLoaderFix: true, // `false` by default
        },
      })
    );
    return config;
  }
};

// Next.js Configuration with `next.intl` enabled
/*const nextWithIntl = withNextIntl('./i18n.tsx')(nextConfig);

export default nextWithIntl;*/
export default nextConfig;
