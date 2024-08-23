'use client'
import { productService } from '@/app/api/products/product.service'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ISearchItem {
    item: Awaited<ReturnType<typeof productService.searchProducts>>[number]
    searchValue: string
    writeSearchItem: (name: string, searchValue: string) => string
}

const SearchItem: React.FC<ISearchItem> = ({ item, searchValue, writeSearchItem }) => {
    return (
        <Link
            href={`/products/${item.id}`}
            key={item.id}
            className="py-2.5 px-3 hover:bg-primary-muted flex items-center gap-3 cursor-pointer w-full"
        >
            <Image src={item.image} alt="" width={30} height={30} />
            <span
                className="text-black/50"
                dangerouslySetInnerHTML={{ __html: writeSearchItem(item.name, searchValue) }}
            ></span>
            <span className="text-secondary-text text-sm">{`${item.items[0].price}`} ₽</span>
        </Link>
    )
}

export default SearchItem
