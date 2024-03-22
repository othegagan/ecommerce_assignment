import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/auth';


const protectedRoutes = ['/'];
const authRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
    const session = await getSession();

    const pathname = request.nextUrl.pathname;

    const response = NextResponse.next();

    if (!session.isLoggedIn && protectedRoutes.includes(pathname)) {
        const loginURL = new URL('/login', request.url);
        // loginURL.searchParams.set("callbackUrl", pathname);
        const response: NextResponse = NextResponse.redirect(loginURL);
        return response;
    }

    if (authRoutes.includes(pathname) && session.isLoggedIn) {
        return NextResponse.redirect(new URL('/', request.nextUrl.origin).href);
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
