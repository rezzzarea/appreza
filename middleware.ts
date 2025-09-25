import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
 
export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request);
 
    // THIS IS NOT SECURE!
    // This is the recommended approach to optimistically redirect users
    // We recommend handling auth checks in each page/route
	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/", request.url));
	}
 
	return NextResponse.next();
}
 
export const config = {
	// matcher: ["/dashboard"], // hanya route dashboard saja yg protected, turunannya tidak
	matcher: ["/dashboard/:path*"], // /:path* istilahnya fully protected route, route nya aman sampai ke akar akarnya
};