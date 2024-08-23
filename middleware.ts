/* Learn next.js middleware */

import { MiddlewareConfig, NextRequest, NextResponse } from 'next/server'

export const config: MiddlewareConfig = {
    matcher: '/about',
}

export function middleware(request: NextRequest) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
}
