/** @type {import('next').NextConfig} */
import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
  webpack: function(config, {isServer}) {
    const federationConfig = {
      name: 'header',
      remotes: {},
      filename: 'static/chunks/remoteEntry.js',
      exposes: {
        './headerwithlogo': '@/components/headerwithlogo',
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
