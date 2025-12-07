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
// Exclude webhook route from matcher entirely (Twilio needs public access)
export const config = {
  matcher: [
    "/agent/:path*",
    "/api/agent/contacts/:path*",
    "/api/agent/call(?!.*webhook)",
    "/api/agent/calls/:path*",
    "/api/agent/campaigns/:path*",
    "/api/agent/businesses/:path*",
  ],
};

