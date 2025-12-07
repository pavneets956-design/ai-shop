export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/agent/:path*", // protect only the agent dashboard & CRM
  ],
};
