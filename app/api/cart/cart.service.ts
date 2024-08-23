import { prisma } from '@/prisma/prisma.client'
import { Cart, CartItem } from '@prisma/client'

class CartService {
    public async hasCart(userId?: number, ip?: string) {
        if (!userId && !ip) {
            return null
        }
        const filter: Record<string, any> = {}
        if (userId) {
            filter.userId = userId
        }
        if (ip) {
            filter.ip = ip
        }
        const cart = await prisma.cart.findFirst({
            where: filter,
            select: {
                id: true,
            },
        })
        return cart
    }
    public async getCart(userId?: number, ip?: string) {
        if (!userId && !ip) {
            return null
        }
        const filter: Record<string, any> = {}
        if (userId) {
            filter.userId = userId
        }
        if (ip) {
            filter.ip = ip
        }
        const cart = await prisma.cart.findFirst({
            where: filter,
            include: {
                items: {
                    include: {
                        productItem: {
                            include: {
                                product: {
                                    select: {
                                        id: true,
                                        name: true,
                                        image: true,
                                    },
                                },
                            },
                        },
                        ingredients: {
                            select: {
                                id: true,
                                name: true,
                                priceMin: true,
                                priceAvg: true,
                                priceMax: true,
                            },
                        },
                    },
                    orderBy: {
                        id: 'asc',
                    },
                },
            },
        })
        return cart
    }
    public async createCartItem(
        cartItem: Omit<CartItem, 'count' | 'id'>,
        ingredientIds: { id: number }[],
    ) {
        const item = await prisma.cartItem.create({
            data: {
                ...cartItem,
                ingredients: {
                    connect: ingredientIds,
                },
            },
            include: {
                cart: true,
                productItem: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                            },
                        },
                    },
                },
            },
        })
        return item
    }
    public async removeCartItem(id: number) {
        const item = await prisma.cartItem.delete({
            where: {
                id,
            },
        })
        return item.id
    }
    public async createCart(cart: Omit<Cart, 'createdAt' | 'id'>) {
        if (!cart.ip && !cart.userId) {
            return null
        }
        const data = await prisma.cart.create({
            data: {
                ...cart,
                items: {
                    connect: [],
                },
            },
            select: {
                id: true,
            },
        })
        return data
    }

    public async changeCountCartItem(id: number, count: number) {
        const item = await prisma.cartItem.update({
            where: {
                id,
            },
            data: {
                count,
            },
        })
        return item
    }
}

export const cartService = new CartService()
