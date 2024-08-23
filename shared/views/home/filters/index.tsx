'use client'

import React, { useEffect } from 'react'
import Checkbox from '../../../components/ui/checkbox'
import { Button } from '../../../components/ui/button'
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group'
import { Label } from '../../../components/ui/label'
import { Slider } from '@/shared/components/ui/slider'
import { useProductFilter } from '@/store/productFilters'
import CheckboxGroup from './CheckboxGroup'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import BaseCheckboxFilter from './BaseCheckboxFilter'
import { LoaderCircle, LoaderPinwheel } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

type Props = {
    className?: string
}

const LeftFilter: React.FC<Props> = ({ className }) => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = new URLSearchParams(useSearchParams().toString())
    const {
        minPrice,
        maxPrice,
        loading,
        isSubmitted,
        setMinPrice,
        setMaxPrice,
        setLoading,
        setIsSubmitted,
    } = useProductFilter()

    useEffect(() => {
        if (!searchParams.get('minPrice') || !searchParams.get('maxPrice')) {
            setMinPrice(100)
            setMaxPrice(1000)
            searchParams.delete('minPrice')
            searchParams.delete('maxPrice')
            pathname && router.push(`${pathname}?${searchParams.toString()}`, { scroll: false })
        } else {
            setMinPrice(Number(searchParams.get('minPrice')))
            setMaxPrice(Number(searchParams.get('maxPrice')))
        }
    }, [])
    const handleChangePrice = ([min, max]: number[]) => {
        setMinPrice(min)
        setMaxPrice(max)
        searchParams.set('minPrice', min.toString())
        searchParams.set('maxPrice', max.toString())
        pathname && router.push(`${pathname}?${searchParams.toString()}`, { scroll: false })
    }
    return (
        <div className="flex flex-col gap-10 col-span-2">
            <h3 className="font-bold text-2xl">Фильтрация</h3>
            <BaseCheckboxFilter />
            <div className="flex flex-col gap-4">
                <span className="text-base font-bold">Цена от и до:</span>
                <div className="flex gap-4">
                    <div className="max-w-[80px] border border-secondary rounded-[10px] flex justify-between px-3 py-2">
                        <input
                            className="outline-none max-w-[50px] text-sm placeholder:text-secondary-text"
                            type="text"
                            placeholder="0"
                            value={minPrice}
                            readOnly
                        />
                        <span className="text-sm text-secondary-text">₽</span>
                    </div>
                    <div className="max-w-[80px] border border-secondary rounded-[10px] flex justify-between px-3 py-2">
                        <input
                            className="outline-none max-w-[50px] text-sm placeholder:text-secondary-text"
                            type="text"
                            placeholder="1950"
                            value={maxPrice}
                            readOnly
                        />
                        <span className="text-sm text-secondary-text">₽</span>
                    </div>
                </div>
            </div>
            <Slider
                onValueChange={handleChangePrice}
                defaultValue={[minPrice, maxPrice]}
                value={[minPrice, maxPrice]}
                min={0}
                max={1000}
            />
            <CheckboxGroup />
            <Button
                disabled={loading}
                variant="default"
                onClick={() => setIsSubmitted(true)}
                size="lg"
                className={cn('transation-all duration-300 mt-8 hover:bg-primary-hover')}
            >
                {loading ? <LoaderCircle className="animate-spin" /> : 'Применить'}
            </Button>
        </div>
    )
}

export default LeftFilter
