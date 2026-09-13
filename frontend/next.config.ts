import type { NextConfig } from "next";

const API_ORIGIN = "http://98.93.1.240:8000";

// The browser never addresses the API directly: it is served over HTTPS and the
// API origin is plain HTTP, which a browser blocks as mixed content. These
// rewrites proxy /api/* server-side instead.
//
// The proxy is an allowlist, not a catch-all. Only the routes this app actually
// calls are forwarded; anything else under /api returns a 404 from Next rather
// than reaching the API. Adding a new API call means adding its prefix here.
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Auth: /auth/register, /auth/login
      { source: "/api/auth/:path*", destination: `${API_ORIGIN}/auth/:path*` },

      // Analysis tools: /tools/evaluate, /tools/odds
      { source: "/api/tools/:path*", destination: `${API_ORIGIN}/tools/:path*` },

      // Sessions: list, create, delete, and a session's hands
      {
        source: "/api/sessions/:path*",
        destination: `${API_ORIGIN}/sessions/:path*`,
      },

      // Analytics: /analytics/dashboard, /analytics/sessions
      {
        source: "/api/analytics/:path*",
        destination: `${API_ORIGIN}/analytics/:path*`,
      },

      // Hand logging. Deliberately exact: the app only creates hands, so
      // /api/hands/<id> is not forwarded.
      { source: "/api/hands", destination: `${API_ORIGIN}/hands` },
    ];
  },
};

export default nextConfig;
