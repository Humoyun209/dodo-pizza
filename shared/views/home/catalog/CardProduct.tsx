'use client'

import React, { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Plus } from 'lucide-react'
import type { CardProductType } from './ListOfProducts'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
    product: CardProductType
    className?: string
}

const CardPizza = ({ product, className }: Props) => {
    const router = useRouter()
    const [loaded, setLoaded] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    return (
        <>
            <div
                onClick={() => router.push(`/product/${product.id}`, { scroll: false })}
                // onClick={() => setOpenModal(true)}
                className=" cursor-pointer"
            >
                <div
                    className={cn(
                        'px-[34px] py-[24px] rounded-[15px] relative',
                        loaded ? 'bg-primary-muted' : 'bg-white',
                    )}
                >
                    {!loaded && (
                        <img
                            width={0}
                            height={0}
                            className={cn('w-full h-auto')}
                            src={'/static/default-product.svg'}
                            alt=""
                            loading="lazy"
                        />
                    )}
                    <img
                        onLoad={() => setLoaded(true)}
                        width={0}
                        height={0}
                        className={cn('w-full h-auto', !loaded && 'hidden')}
                        src={product.image}
                        alt=""
                        loading="lazy"
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <h3 className="text-[22px] font-bold">{product.name}</h3>
                    <p className="text-secondary-text text-sm">
                        {product.ingredients.length > 0
                            ? [...product.ingredients.map(({ name }) => name)]
                                  .splice(0, 8)
                                  .join(', ')
                            : product.description}
                    </p>
                    <div className="flex justify-between items-center">
                        <span className="text-xl">
                            от <b>{`${product.items[0]?.price}`} ₽</b>
                        </span>
                        <Button className="transition-all duration-300 bg-primary-muted flex gap-1 text-primary hover:bg-primary-foreground hover:text-primary-hover">
                            <Plus size={16} />
                            <span>Добавить</span>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardPizza
