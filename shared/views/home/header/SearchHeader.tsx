'use client'
import { Search, X } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useClickAway, useDebounce } from 'react-use'
import SearchItem from './SearchItem'
import { cn } from '@/shared/lib/utils'
import useSWR from 'swr'
import { BASE_URL, fetcher } from '@/shared/lib/fetcher'
import { productService } from '@/app/api/products/product.service'
import { useRouter } from 'next/navigation'

type Props = {
    showSearch?: boolean
}

const SearchHeader = (props: Props) => {
    const ref = useRef<HTMLDivElement>(null)
    const [focused, setFocused] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')
    useClickAway(ref, () => {
        setFocused(false)
        setSearchValue('')
    })

    const writeSearchItem = (name: string, searchValue: string) => {
        if (name.includes(searchValue)) {
            return name.split(searchValue).join(`<span class="text-dark">${searchValue}</span>`)
        }
        return name
    }

    const {
        data: products = [],
        error,
        isLoading,
    } = useSWR<Awaited<ReturnType<typeof productService.searchProducts>>, Error>(
        `${BASE_URL}/products/search?query=${searchValue}`,
        { fetcher: fetcher, revalidateIfStale: true },
    )

    return (
        <>
            {focused && (
                <div className=" fixed bg-black/50 top-0 bottom-0 left-0 right-0 z-20"></div>
            )}
            <div className="relative max-w-[640px] w-full z-30">
                <div
                    ref={ref}
                    onClick={() => setFocused(true)}
                    className="flex justify-start items-center gap-3 bg-secondary-foreground rounded-[15px]  px-5 py-[10px] z-30"
                >
                    <Search size={16} className="text-secondary" />
                    <input
                        onChange={e => setSearchValue(e.target.value)}
                        value={searchValue}
                        className="outline-none border-none w-full bg-transparent placeholder:text-secondary"
                        type="text"
                        placeholder="Поиск пиццы"
                    />
                    {focused && searchValue.length > 0 && (
                        <button
                            onClick={() => setSearchValue('')}
                            className="border-none outline-none bg-transparent p-0"
                        >
                            <X size={20} className="text-secondary" />
                        </button>
                    )}
                </div>
                <div
                    className={cn(
                        'rounded-[15px] px-0 block absolute top-14 z-30 py-4 w-full bg-white border border-secondary opacity-0 scale-0 transition-all duration-300 delay-100',
                        focused && 'opacity-100 scale-1 top-12',
                    )}
                >
                    {!isLoading && !error && products.length > 0 ? (
                        products.map(item => (
                            <SearchItem
                                key={item.id}
                                item={item}
                                searchValue={searchValue}
                                writeSearchItem={writeSearchItem}
                            />
                        ))
                    ) : (
                        <h3 className="text-dark text-center text-xl font-semibold">
                            Ничего не найдено!
                        </h3>
                    )}
                </div>
            </div>
        </>
    )
}

export default SearchHeader
