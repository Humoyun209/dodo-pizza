import { PizzaType, CartItem } from '@prisma/client'

export interface ICartItem {
    productItemId: number
    ingredientIds: number[]
    pizzaType: PizzaType
}
