'use client'
import { cn } from '@/shared/lib/utils'

import React, { useEffect, useState } from 'react'
import { useCategoryId } from '@/store/category'
import Container from '@/shared/components/ui/container'
import SortedPopover from './SortedPopover'
import { usePathname, useRouter } from 'next/navigation'
import path from 'path'

type Props = {
    className?: string
}

const HeaderOfCategories = (props: Props) => {
    const router = useRouter()
    const pathname = usePathname()
    interface ICategory {
        id: number
        name: string
    }
    const [categories, setCategories] = useState<ICategory[]>([])
    useEffect(() => {
        fetch('/api/categories')
            .then(res => res.json())
            .then((data: { categories: ICategory[] }) => setCategories(data.categories))
    }, [])
    const { setCategoryId, categoryId } = useCategoryId()

    const safePageCategory = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, name: string) => {
        e.preventDefault()
        router.push(pathname + "#" + name, {scroll: false})
        const element = document.getElementById(name)
        element?.scrollIntoView({behavior: "smooth"})
    }
    return (
        <>
            <Container>
                <h1 className="text-4xl font-bold mt-20 mb-5">{`${
                    categories.find(cat => cat.id == categoryId)?.name || 'Загрузка...'
                }`}</h1>
            </Container>
            <div className="sticky top-0 z-10 bg-white pb-6 pt-4 shadow-md">
                <Container className="flex justify-between items-center">
                    <div className="p-[6px] bg-secondary-foreground inline-flex gap-1 rounded-md">
                        {categories.map((cat, index) => (
                            <a onClick={(e) => safePageCategory(e, cat.name)} key={index} href={`/#${cat.name}`}>
                                <button
                                    onClick={() => setCategoryId(cat.id)}
                                    className={cn(
                                        'rounded-md text-dark font-semibold px-4 py-2 text-nowrap',
                                        categoryId == cat.id
                                            ? 'bg-white shadow-md'
                                            : 'bg-transparent',
                                    )}
                                >
                                    {cat.name}
                                </button>
                            </a>
                        ))}
                    </div>
                    <SortedPopover />
                </Container>
            </div>
        </>
    )
}

export default HeaderOfCategories
