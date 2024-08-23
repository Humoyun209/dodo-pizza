import { NextResponse, NextRequest } from 'next/server'
import { cartService } from './cart.service'

export const GET = async (req: Request) => {
    const ip = req.headers.get('x-forwarded-for') as string
    const data = await cartService.getCart(undefined, ip)
    return NextResponse.json(data, { status: 200 })
}
