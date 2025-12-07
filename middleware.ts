import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Exclude webhook route from auth (Twilio needs public access)
    if (req.nextUrl.pathname.startsWith("/api/agent/call/webhook")) {
      return NextResponse.next();
    }

    // You can add additional middleware logic here if needed
    // For example, role-based access control
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Exclude webhook route from auth requirement
        if (req.nextUrl.pathname.startsWith("/api/agent/call/webhook")) {
          return true;
        }
        // Require authentication for all other protected routes
        return !!token;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

// Protect all routes under /agent/* and /api/agent/*
// Note: /api/agent/call/* is NOT in the matcher
// - /api/agent/call (PUT) has auth check in the route itself
// - /api/agent/call/webhook (GET/POST) must be public for Twilio
export const config = {
  matcher: [
    "/agent/:path*",
    "/api/agent/contacts/:path*",
    "/api/agent/calls/:path*",
    "/api/agent/campaigns/:path*",
    "/api/agent/businesses/:path*",
  ],
};

