/** @type {import('next').NextConfig} */
import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
  webpack: function(config, {isServer}) {
    const federationConfig = {
      name: 'account',
      remotes: {},
      filename: 'static/chunks/remoteEntry.js',
      exposes: {
        './balancebutton': '@/components/balancebutton',
        './cashbutton': '@/components/cashbutton'
      },
      remotes: {
        header: `header@${process.env.HEADER_MFE_URL}/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`
      },
      shared: {
      },
      extraOptions: {
        exposePages: true, // `false` by default
        enableImageLoaderFix: true, // `false` by default
        enableUrlLoaderFix: true, // `false` by default
      },
    };
    config.plugins.push(
      new NextFederationPlugin(federationConfig),
    );
    return config;
  }
};

export default nextConfig;
