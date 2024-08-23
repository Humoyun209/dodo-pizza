import { NextRequest, NextResponse } from 'next/server'
import { cartService } from '../cart.service'

interface IPutCartItem {
    id: number
    count: number
}

export const PUT = async (req: NextRequest) => {
    const data: IPutCartItem = await req.json()
    console.log(data)
    const result = await cartService.changeCountCartItem(data.id, data.count)
    return NextResponse.json(result, { status: 200 })
}
