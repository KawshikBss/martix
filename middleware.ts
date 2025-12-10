import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const authToken = request.cookies.get("authToken")?.value;
    if (authToken) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: "/dashboard/:path*",
};
