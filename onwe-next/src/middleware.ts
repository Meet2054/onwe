import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  return NextResponse.next();
}

// export const config = {
//   matcher: ["/:path*"], // Match all routes
// };
