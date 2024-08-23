import React, { useEffect, useRef } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from '@/shared/components/ui/sheet'
import { Button } from '@/shared/components/ui/button'
import { ArrowRight, LoaderCircle, Minus, Plus, ShoppingCart } from 'lucide-react'
import CartItem from './CartItem'
import useSWR from 'swr'
import { BASE_URL, fetcher } from '@/shared/lib/fetcher'
import { cartService } from '@/app/api/cart/cart.service'
import { getAllProductLength, getSumAllProducts } from './utils'
import ButtonWithLoading from '@/shared/components/common/ButtonWithLoading'

type TCart = Awaited<ReturnType<typeof cartService.getCart>>

const CartDrawer = () => {
    const { data, isLoading, error, isValidating } = useSWR<TCart, Error>(`${BASE_URL}/cart`, {
        fetcher,
    })
    return (
        <Sheet>
            <SheetTrigger asChild>
                <ButtonWithLoading
                    className="flex items-center gap-4 group relative"
                    loading={isLoading}
                    changeWidth
                >
                    <b>{getSumAllProducts(data?.items || [])} ₽</b>
                    <span className="h-full w-[1px] bg-white/30"></span>
                    <div className="transition duration-300 ease-in-out flex items-center gap-1 group-hover:opacity-0">
                        <ShoppingCart size={16} />
                        <b>{getAllProductLength(data?.items || [])}</b>
                    </div>
                    <ArrowRight
                        size={20}
                        className="transition duration-300 ease-in-out absolute opacity-0 right-6 group-hover:opacity-100"
                    />
                </ButtonWithLoading>
            </SheetTrigger>
            <SheetContent className="bg-secondary-foreground flex flex-col p-0">
                <SheetHeader className="mt-4">
                    <SheetTitle className="text-xl text-dark mx-2">
                        В корзине <b>{getAllProductLength(data?.items || [])} товара</b>
                    </SheetTitle>
                </SheetHeader>
                <div className="mt-5 flex flex-col gap-5 overflow-y-auto mb-10">
                    {!isLoading &&
                        data?.items &&
                        data.items.map(item => <CartItem key={item.id} item={item} />)}
                </div>
                <div className="mt-auto bg-white p-[35px] flex flex-col gap-3">
                    <span className="flex justify-between">
                        <p>Итого:</p>
                        <b>{getSumAllProducts(data?.items || [])} ₽</b>
                    </span>
                    <Button size={'lg'} className="mt-4 flex justify-between items-center">
                        <span></span>
                        <span>Оформить заказ</span>
                        <ArrowRight size={20} />
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default CartDrawer
