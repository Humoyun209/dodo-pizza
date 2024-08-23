import { cn } from '@/shared/lib/utils'
import { PizzaType, ProductItem } from '@prisma/client'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    size: number
    typeProduct: PizzaType
    setSize: Dispatch<SetStateAction<number>>
    setSumAddivities: Dispatch<SetStateAction<number>>
    setTypeProduct: Dispatch<SetStateAction<PizzaType>>
    items: ProductItem[]
}

const ProductItemFilter = ({
    size,
    typeProduct,
    setSize,
    setSumAddivities,
    setTypeProduct,
    items,
}: Props) => {
    return (
        <>
            <div className="bg-[#ECECEC] shadow-sm rounded-[30px] grid grid-cols-3 gap-1 mt-5">
                {items?.map((item, i) => (
                    <button
                        onClick={() => {
                            setSize(i + 1)
                            setSumAddivities(0)
                        }}
                        className={cn(
                            'text-dark  rounded-[30px] py-2',
                            size == i + 1 && 'bg-white shadow-md',
                        )}
                    >
                        {item.name}
                    </button>
                ))}
            </div>
            <div className="bg-[#ECECEC] shadow-sm rounded-[30px] grid grid-cols-2 gap-1 mt-5">
                <button
                    onClick={() => setTypeProduct(PizzaType.TRADIONAL)}
                    disabled={!items[size - 1].isTraditional}
                    className={cn(
                        'text-dark  rounded-[30px] py-2',
                        typeProduct == PizzaType.TRADIONAL && 'bg-white  shadow-md',
                    )}
                >
                    Традиционное
                </button>
                <button
                    onClick={() => setTypeProduct(PizzaType.THIN)}
                    disabled={!items[size - 1].isThin}
                    className={cn(
                        'text-dark  rounded-[30px] py-2',
                        typeProduct == PizzaType.THIN && 'bg-white  shadow-md',
                    )}
                >
                    Тонкое
                </button>
            </div>
        </>
    )
}

export default ProductItemFilter
