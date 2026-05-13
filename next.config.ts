import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost", "192.168.1.53"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async headers() {
    return [
      // CSP pour le site (appliquée en premier)
      {
        source: "/((?!studio).*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "frame-src 'self' https://tally.so https://*.tally.so https://zcal.co https://*.zcal.co https://www.google.com https://maps.google.com",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tally.so https://static.zcal.co https://*.google-analytics.com https://*.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://static.zcal.co",
              "img-src 'self' https://cdn.sanity.io https://static.zcal.co data:",
              `connect-src 'self' https://*.google-analytics.com https://zcal.co https://*.zcal.co${process.env.NODE_ENV === "development" ? " ws://localhost:* ws://127.0.0.1:*" : ""}`,
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
      // CSP permissive pour Sanity Studio
      {
        source: "/studio/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "frame-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://core.sanity-cdn.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' https://cdn.sanity.io data: blob:",
              "connect-src 'self' https://*.sanity.io https://*.api.sanity.io wss://*.sanity.io https://sanity-cdn.com https://*.sanity-cdn.com",
              "font-src 'self' data:",
              "media-src 'self' https://cdn.sanity.io",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
