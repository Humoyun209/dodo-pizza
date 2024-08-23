import { NextRequest, NextResponse } from 'next/server'
import { ICartItem } from '../types'
import { cartService } from '../cart.service'

export const POST = async (req: NextRequest) => {
    const cartItemData: ICartItem = await req.json()
    const isAuthorized = false
    if (!isAuthorized) {
        const ip = req.headers.get('x-forwarded-for') as string
        let cart = await cartService.hasCart(undefined, ip)
        if (!cart) {
            cart = await cartService.createCart({ ip, userId: null })
        }

        const cartItem = await cartService.createCartItem(
            {
                productItemId: cartItemData.productItemId,
                type: cartItemData.pizzaType,
                cartId: cart?.id as number,
            },
            cartItemData.ingredientIds.map(id => ({ id })),
        )
        return NextResponse.json(cartItem, { status: 201 })
    }
}
