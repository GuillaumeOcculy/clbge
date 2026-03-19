import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "frame-src 'self' https://tally.so https://*.tally.so https://zcal.co https://*.zcal.co",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tally.so https://*.google-analytics.com https://*.googletagmanager.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' https://cdn.sanity.io data:",
              "connect-src 'self' https://*.sanity.io https://*.google-analytics.com",
              "font-src 'self' data:",
            ].join("; "),
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
