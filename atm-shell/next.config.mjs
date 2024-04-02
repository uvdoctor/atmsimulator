import {withSentryConfig} from '@sentry/nextjs';
/** @type {import('next').NextConfig} */
import withNextIntl from 'next-intl/plugin';
import { NextFederationPlugin } from '@module-federation/nextjs-mf';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/login",
        destination: process.env.LOGIN_API,
      },
      {
        source: "/api/logout",
        destination: process.env.LOGOUT_API,
      },
    ];
  },
  webpack: function(config, {isServer}) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'shell',
        remotes: {
          balance: `balance@${process.env.BALANCE_MFE_URL}/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
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
export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

// Suppresses source map uploading logs during build
silent: true,
org: "moneo-60",
project: "atm-simulator",
}, {
// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Transpiles SDK to be compatible with IE11 (increases bundle size)
transpileClientSDK: true,

// Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers. (increases server load)
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors.
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});