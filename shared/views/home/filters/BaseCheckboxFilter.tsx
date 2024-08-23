import React, { useEffect } from 'react'
import Checkbox from '../../../components/ui/checkbox'
import { useProductFilter } from '@/store/productFilters'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useToggleSearchParams } from '@/shared/hooks/useToggleSearchParams'

type Props = {}

const BaseCheckboxFilter = (props: Props) => {
    const { isNew, isCollected, setIsNew, setIsCollected } = useProductFilter()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = new URLSearchParams(useSearchParams().toString())

    useEffect(() => {
        if (searchParams.get('isNew')) {
            setIsNew(true)
        }
        if (searchParams.get('isCollected')) {
            setIsCollected(true)
        }
    }, [])

    return (
        <div className="flex flex-col items-start gap-4 text-base">
            <div
                className="cursor-pointer"
                onClick={() => {
                    setIsCollected(!isCollected)
                    const params = useToggleSearchParams('isCollected', '1', searchParams)
                    router.push(`${pathname}?${params.toString()}`, { scroll: false })
                }}
            >
                <Checkbox checked={isCollected} /> Можно собрать
            </div>
            <div
                className="cursor-pointer"
                onClick={() => {
                    setIsNew(!isNew)
                    const params = useToggleSearchParams('isNew', '1', searchParams)
                    router.push(`${pathname}?${params.toString()}`, { scroll: false })
                }}
            >
                <Checkbox checked={isNew} /> Новинки
            </div>
        </div>
    )
}

export default BaseCheckboxFilter
