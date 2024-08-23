import { NextRequest, NextResponse } from 'next/server'
import { productService } from './product.service'
import { checkNumberArray } from './utils'

export const GET = async (req: NextRequest) => {
    const searchParams = new URLSearchParams(req.nextUrl.search)
    const sMinPrice = searchParams.get('minPrice') || undefined
    const sMaxPrice = searchParams.get('maxPrice') || undefined
    const sIngredients = searchParams.get('ingredients') || ''

    const minPrice = Number(sMinPrice)
    const maxPrice = Number(sMaxPrice)

    const filters: Record<string, any> = {
        minPrice: minPrice || 0,
        maxPrice: maxPrice || 99999999999999,
    }

    if (checkNumberArray(sIngredients, '|').length > 0) {
        filters.ingredients = checkNumberArray(sIngredients, '|')
    }
    const products = await productService.getProducts(filters)
    return NextResponse.json(products, { statusText: 'OK' })
}
