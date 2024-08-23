import React from 'react'
import { Button } from '@/shared/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
import { ArrowUpDown } from 'lucide-react'
import { useProductFilter } from '@/store/productFilters'
import type { TSorted } from '@/store/productFilters'

type Props = {}

const SortedPopover = (props: Props) => {
    const { setSortedBy, sortedBy } = useProductFilter()
    const [openPopover, setOpenPopover] = React.useState(false)
    let sortedByRu = 'по рейтингу'
    switch (sortedBy) {
        case 'alphabet':
            sortedByRu = 'по алфавиту'
            break
        case 'price':
            sortedByRu = 'по цене'
            break
        case 'rating':
            sortedByRu = 'по рейтингу'
            break
        default:
            sortedByRu = 'по рейтингу'
            break
    }

    const handleSetSortedBy = (sortedBy: TSorted) => {
        setSortedBy(sortedBy)
        setOpenPopover(false)
    }
    return (
        <Popover open={openPopover} onOpenChange={setOpenPopover}>
            <PopoverTrigger asChild>
                <Button variant="default" className="bg-secondary-foreground inline-flex gap-1">
                    <ArrowUpDown size={16} stroke="#000000" />
                    <span className="text-base font-bold text-dark">Сортировка: </span>
                    <span className="text-primary text-base"> {sortedByRu}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className=" flex flex-col px-0 py-1.5 max-w-[225px] w-full">
                <div
                    onClick={() => handleSetSortedBy('alphabet')}
                    className="py-1.5 px-[50px] font-bold text-base text-dark hover:bg-primary-muted cursor-pointer"
                >
                    По алфавиту
                </div>
                <div
                    onClick={() => handleSetSortedBy('price')}
                    className="py-1.5 px-[50px] font-bold text-base text-dark hover:bg-primary-muted cursor-pointer"
                >
                    По цене
                </div>
                <div
                    onClick={() => handleSetSortedBy('rating')}
                    className="py-1.5 px-[50px] font-bold text-base text-dark hover:bg-primary-muted cursor-pointer"
                >
                    По рейтингу
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default SortedPopover
