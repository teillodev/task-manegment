import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {validateToken} from "@/lib/cache";
import { cookies } from 'next/headers';

export  async function proxy(request: NextRequest) {
    const token = request.cookies.get('token_auth_1') // or session cookie
    console.log((await cookies()).get('token_auth_1'))
    console.log("Middleware - Cookies:", request.cookies)

    console.log("Middleware - Token:", token);
    if (!token) {
        console.error('Could not find token', token);
        return NextResponse.json([] )
    }

    // const validToken = validateToken(token.value)
    const validToken = await validateToken(token.value);

    if (!validToken) {
        console.error('Invalid token', token.value);
        return NextResponse.json([])
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/api/tasks'],
}
