/** @type {import('next').NextConfig} */
import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const nextConfig = {
  reactStrictMode: true,
  webpack: function(config, {isServer}) {
    const federationConfig = {
      name: 'balance',
      remotes: {},
      filename: 'static/chunks/remoteEntry.js',
      exposes: {
        './description': '@/components/description.js',
      },
      shared: {
        // whatever else
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
