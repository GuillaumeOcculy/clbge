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
              "frame-src 'self' https://tally.so https://*.tally.so https://zcal.co https://*.zcal.co https://www.google.com https://maps.google.com",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tally.so https://static.zcal.co https://*.google-analytics.com https://*.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://static.zcal.co",
              "img-src 'self' https://static.zcal.co data:",
              "connect-src 'self' https://*.google-analytics.com https://zcal.co https://*.zcal.co",
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
