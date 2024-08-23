import { Size } from '@prisma/client'
export const sumProductWithIngredients = (item: any, size: Size) => {
    type TPriceSize = 'priceMax' | 'priceAvg' | 'priceMin'
    let currentSize: TPriceSize = 'priceMin'

    switch (size) {
        case 'SMALL':
            currentSize = 'priceMin'
            break
        case 'MEDIUM':
            currentSize = 'priceAvg'
            break
        default:
            currentSize = 'priceMax'
    }

    let sum = 0
    item.ingredients.forEach((ingredient: any) => {
        sum += ingredient[currentSize]
    })
    return (sum + item.productItem.price) * item.count
}

export const getAllProductLength = (items: any[]) => {
    let count = 0
    items.forEach(item => (count = count + item.count))
    return count
}

export const getSumAllProducts = (items: any[]) => {
    let sum = 0
    items.forEach(item => (sum += sumProductWithIngredients(item, item.productItem.size)))
    return sum
}
