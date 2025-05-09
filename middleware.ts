// middleware.ts (place in the root directory of your Next.js app)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of allowed origins
const allowedOrigins = [
  "https://bio-blue-beta.vercel.app",
  "http://localhost:3000",
  // Add other allowed domains if needed
];

export function middleware(request: NextRequest) {
  // Get the origin from the request headers
  const origin = request.headers.get("origin") || "";

  // Check if the request is for an API route
  const isApiRoute = request.nextUrl.pathname.startsWith("/api");

  // Only apply CORS for API routes
  if (isApiRoute) {
    // Create the response
    const response = NextResponse.next();

    // Set CORS headers only if origin is allowed or in development
    const allowOrigin =
      allowedOrigins.includes(origin) || process.env.NODE_ENV === "development"
        ? origin
        : allowedOrigins[0]; // Default to first allowed origin

    // Set the CORS headers
    response.headers.set("Access-Control-Allow-Origin", allowOrigin);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    response.headers.set("Access-Control-Max-Age", "86400"); // 24 hours

    return response;
  }

  // For non-API routes, just continue
  return NextResponse.next();
}

// Configure the middleware to only run for API routes
export const config = {
  matcher: "/api/:path*",
};
