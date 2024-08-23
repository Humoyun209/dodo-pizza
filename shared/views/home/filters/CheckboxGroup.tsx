'use client'
import { BASE_URL, fetcher } from '@/shared/lib/fetcher'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import Checkbox from '@/shared/components/ui/checkbox'
import { useProductFilter } from '@/store/productFilters'
import { cn } from '@/shared/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Props = {}
interface Ingredient {
    id: number
    name: string
}

const CheckboxGroup = (props: Props) => {
    const searchParams = useSearchParams().toString()
    const params = new URLSearchParams(searchParams.toString())
    const router = useRouter()
    const pathname = usePathname()
    const {
        data: ingredients = [],
        isLoading,
        error,
    } = useSWR<Ingredient[]>(`${BASE_URL}/ingredients`, {
        fetcher: fetcher,
    })
    const { ingredients: filteredIngredients, setIngredients } = useProductFilter()

    useEffect(() => {
        const ingredientStr = params.get('ingredients')
        if (ingredientStr) {
            const ingredientIds = ingredientStr.split('|').map(Number)
            setIngredients(ingredientIds)
        }
    }, [])
    const changeIngredients = (name: string, id: number) => {
        if (!filteredIngredients.includes(id)) {
            setIngredients([...filteredIngredients, id])
            params.set('ingredients', [...filteredIngredients, id].join('|'))
        } else {
            const withoutId = filteredIngredients.filter(e => e !== id)
            setIngredients(withoutId)
            params.set('ingredients', withoutId.join('|'))
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    const [showAll, setShowAll] = useState<boolean>(false)
    const [searchV, setsearchV] = useState<string>('')

    return (
        <div>
            <h3 className="font-bold text-base text-dark">Ингредиенты:</h3>
            {showAll && (
                <input
                    type="text"
                    className=" border border-secondary outline-none rounded-sm py-2 px-3 text-sm text-secondary-text max-w-[150px] my-4 placeholder:text-secondary"
                    placeholder="Поиск..."
                    value={searchV}
                    onChange={e => setsearchV(e.target.value)}
                />
            )}
            <div
                className={cn(
                    'flex flex-col mt-3 items-start gap-4 text-base max-h-[300px] ',
                    showAll ? 'overflow-auto' : 'overflow-hidden',
                )}
            >
                {!isLoading &&
                    ingredients
                        .slice(0, !showAll ? 5 : 250)
                        .filter(e => e.name.toLowerCase().includes(searchV.toLowerCase()))
                        .map((e, i) => (
                            <div
                                onClick={() => changeIngredients(e.name, e.id)}
                                key={i}
                                className="flex gap-2 items-center cursor-pointer"
                            >
                                <Checkbox checked={filteredIngredients.includes(e.id)} />
                                <span>{e.name}</span>
                            </div>
                        ))}
            </div>
            <button
                onClick={() => setShowAll(e => !e)}
                className="text-primary text-base mt-5 font-medium cursor-pointer"
            >
                {!showAll ? '+ Показать всё' : '- Показать меньше'}
            </button>
        </div>
    )
}

export default CheckboxGroup
