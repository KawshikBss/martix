import { getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const authToken = request.cookies.get("authToken")?.value;
    if (authToken) {
        const authUserString = request.cookies.get("authUser")?.value;
        const authUser = JSON.parse(authUserString || "{}") as UserInterface;
        if (
            (authUser &&
                authUser.name &&
                authUser.email &&
                authUser.phone &&
                authUser.image &&
                authUser.address &&
                authUser.nid) ||
            request.nextUrl.pathname === "/dashboard/profile"
        ) {
            return NextResponse.next();
        }
        return NextResponse.redirect(
            new URL("/dashboard/profile", request.url)
        );
    }
    return NextResponse.redirect(new URL("/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: "/dashboard/:path*",
};
