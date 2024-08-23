import { cn } from '@/shared/lib/utils'
import { Decimal } from '@prisma/client/runtime/library'
import { CircleCheck } from 'lucide-react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

type Props = {
    ingredient: {
        id: number
        image: string
        name: string
        priceMin: number
        priceMax: number
        priceAvg: number
    }
    size: number
    setSumPrice: Dispatch<SetStateAction<number>>
    setIngredientIds: Dispatch<SetStateAction<number[]>>
    ingredientIds: number[]
}

const IngredientCard = ({
    ingredient,
    size,
    setSumPrice,
    ingredientIds,
    setIngredientIds,
}: Props) => {
    const [selected, setSelected] = useState(false)
    const [currentPrice, setCurrentPrice] = useState<number>(ingredient.priceMin)

    useEffect(() => {
        if (size == 1) setCurrentPrice(ingredient.priceMin)
        else if (size == 2) setCurrentPrice(ingredient.priceAvg)
        else setCurrentPrice(Number(ingredient.priceMax))
    }, [size])

    useEffect(() => {
        setSelected(ingredientIds.includes(ingredient.id))
    }, [ingredientIds])

    const handleAddPrice = () => {
        if (selected) {
            setIngredientIds(s => s.filter(e => e != ingredient.id))
            setSumPrice(val => val - currentPrice)
        } else {
            setIngredientIds(s => [...s, ingredient.id])
            setSumPrice(val => val + currentPrice)
        }
    }
    return (
        <div
            onClick={handleAddPrice}
            className={cn(
                'bg-white pt-3 pb-[10px] px-[10px] flex flex-col gap-[5px] rounded-[15px] items-center cursor-pointer relative shadow-sm',
                selected && 'border-[2px] border-primary',
            )}
        >
            <img width={110} height={110} src={ingredient.image} alt="" />
            <p className="text-dark text-xs text-center">{ingredient.name}</p>
            <span className="mt-auto text-sm font-semibold">{currentPrice} ₽</span>
            <CircleCheck
                className={cn('text-primary absolute top-2 right-2 hidden', selected && 'block')}
                size={20}
            />
        </div>
    )
}

export default IngredientCard
