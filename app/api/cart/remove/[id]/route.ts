import { NextRequest, NextResponse } from 'next/server'
import { cartService } from '../../cart.service'

export const DELETE = async (req: NextRequest, { params: { id } }: { params: { id: string } }) => {
    const result = await cartService.removeCartItem(Number(id))
    if (result) {
        return NextResponse.json({ ok: true }, { status: 201 })
    }
    return NextResponse.json({ ok: false }, { status: 201 })
}
