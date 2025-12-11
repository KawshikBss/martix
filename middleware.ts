import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { UserInterface } from "./lib/interfaces/UserInterface";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const currentPath = request.nextUrl.pathname;
    const authToken = request.cookies.get("authToken")?.value;

    if (authToken) {
        if (currentPath === "/login" || currentPath == "/signup") {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        const authUserString = request.cookies.get("authUser")?.value;
        const authUser = JSON.parse(authUserString || "{}") as UserInterface;
        if (
            currentPath !== "/dashboard/profile" &&
            authUser &&
            (!authUser.name ||
                !authUser.email ||
                !authUser.phone ||
                !authUser.image ||
                !authUser.address ||
                !authUser.nid)
        ) {
            return NextResponse.redirect(
                new URL("/dashboard/profile", request.url)
            );
        }
        return NextResponse.next();
    }
    if (currentPath === "/login" || currentPath == "/signup") {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ["/dashboard/:path*", "/login", "/signup"],
};
