import React, { Dispatch, SetStateAction } from 'react'
import IngredientCard from './IngredientCard'

type Props = {
    addivities: {
        id: number
        name: string
        image: string
        priceMin: number
        priceAvg: number
        priceMax: number
    }[]
    size: number
    setSumAddivities: Dispatch<SetStateAction<number>>
    ingredientIds: number[]
    setIngredientIds: Dispatch<SetStateAction<number[]>>
}

const IngredientCardList = ({
    addivities,
    size,
    setSumAddivities,
    ingredientIds,
    setIngredientIds,
}: Props) => {
    return (
        <div className="mt-8 mb-4">
            <h3 className="text-[18px] text-semibold">Добавить по вкусу</h3>
            <div className="grid grid-cols-3 gap-[14px] mt-4 max-h-[200px] overflow-auto">
                {addivities?.map(i => (
                    <IngredientCard
                        setSumPrice={setSumAddivities}
                        ingredientIds={ingredientIds}
                        setIngredientIds={setIngredientIds}
                        key={i.id}
                        ingredient={i}
                        size={size}
                    />
                ))}
            </div>
        </div>
    )
}

export default IngredientCardList
