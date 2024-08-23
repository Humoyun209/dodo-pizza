'use client'

import React, { useEffect, useState } from 'react'
import ListOfProducts from './ListOfProducts'
import { productService } from '@/app/api/products/product.service'
import { useProductFilter } from '@/store/productFilters'

type Props = {}
type TCatalogProducts = Awaited<ReturnType<typeof productService.getProducts>>

const CatalogOfProducts = (props: Props) => {
    const { setLoading, isSubmitted, minPrice, maxPrice, ingredients, setIsSubmitted } =
        useProductFilter()
    const [categories, setCategories] = useState<TCatalogProducts>([])

    useEffect(() => {
        setLoading(true)
        fetch(
            `http://localhost:3000/api/products?ingredients=${ingredients.join(
                '|',
            )}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
        )
            .then(res => res.json())
            .then((data: TCatalogProducts) => {
                setLoading(false)
                setCategories(data)
            })
        return () => setIsSubmitted(false)
    }, [isSubmitted])

    return (
        <div className="col-span-8 flex flex-col">
            {categories.map((cat, ind) => (
                <ListOfProducts key={cat.id} category={cat} className={ind > 0 ? 'mt-28' : ''} />
            ))}
        </div>
    )
}

export default CatalogOfProducts
