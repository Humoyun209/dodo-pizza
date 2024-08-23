import { prisma } from '@/prisma/prisma.client'
import { TSorted } from '@/store/productFilters'
interface IFilters {
    sortedBy?: TSorted
    ingredients?: number[]
    minPrice?: number
    maxPrice?: number
}

class ProductService {
    async getProducts(filters?: IFilters) {
        const products = await prisma.category.findMany({
            include: {
                products: {
                    include: {
                        items: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                size: true,
                            },
                            where: {
                                size: 'SMALL',
                            },
                        },
                        ingredients: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                    where: {
                        OR: [
                            {
                                ingredients: {
                                    none: {},
                                },
                            },
                            {
                                AND: {
                                    ingredients: {
                                        some: {
                                            id: {
                                                in: filters?.ingredients,
                                            },
                                        },
                                    },
                                    items: {
                                        some: {
                                            price: {
                                                gte: filters?.minPrice,
                                                lte: filters?.maxPrice,
                                            },
                                            size: 'SMALL',
                                        },
                                    },
                                },
                            },
                        ],
                    },
                },
            },
            where: {
                products: {
                    some: {},
                },
            },
            orderBy: {
                id: 'asc',
            },
        })
        return products
    }
    async getProduct(productId: number) {
        const product = await prisma.product.findUnique({
            include: {
                items: true,
                ingredients: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                addivities: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        priceMin: true,
                        priceAvg: true,
                        priceMax: true,
                    },
                    orderBy: {
                        id: "asc"
                    }
                },
            },
            where: {
                id: productId,
            },
        })
        return product
    }
    async searchProducts(query: string) {
        const randomSkip = Math.floor(Math.random() * 11 + 1)
        const products = await prisma.product.findMany({
            select: {
                id: true,
                name: true,
                image: true,
                items: {
                    select: {
                        id: true,
                        price: true,
                    },
                    where: {
                        size: 'SMALL',
                    },
                },
            },
            where: {
                name: {
                    contains: query,
                },
            },
            skip: query == '' ? randomSkip : 0,
            take: 5,
            orderBy: {
                id: 'asc',
            },
        })
        return products
    }
    async updateProduct() {}
    async deleteProduct() {}
    async createProduct() {}
}

export const productService = new ProductService()
