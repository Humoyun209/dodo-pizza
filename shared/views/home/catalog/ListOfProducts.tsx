'use client'

import React, { useEffect, useRef } from 'react'
import CardPizza from './CardProduct'
import { useIntersection } from 'react-use'
import { useCategoryId } from '@/store/category'
import { cn } from '@/shared/lib/utils'
import { productService } from '@/app/api/products/product.service'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

type Props = {
    category: Awaited<ReturnType<typeof productService.getProducts>>[number]
    className?: string
}

const ListOfProducts = ({ category, className }: Props) => {
    const pathname = usePathname()
    const router = useRouter()
    const { setCategoryId } = useCategoryId()
    const intersectionRef = useRef(null)
    const intersection = useIntersection(intersectionRef, { threshold: 0.4 })
    useEffect(() => {
        if (intersection?.isIntersecting) {
            setCategoryId(category.id)
        }
    }, [category.id, intersection?.isIntersecting, setCategoryId])


    return (
        <>
            <div id={category.name}></div>
            <div className={cn('grid grid-cols-3 gap-[50px]', className)} ref={intersectionRef}>
                <h1 className="text-4xl font-bold text-dark col-span-3">{category.name}</h1>
                {category.products.map(product => (
                    <CardPizza product={product} key={product.id} />
                ))}
            </div>
        </>
    )
}

export default ListOfProducts
export type CardProductType = Props['category']['products'][number]
