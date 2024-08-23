'use client'

import { BASE_URL, fetcher } from '@/shared/lib/fetcher'
import { useEffect, useState } from 'react'
import useSWR, { mutate } from 'swr'
import toast from 'react-hot-toast'
import { PizzaType } from '@prisma/client'
import ButtonWithLoading from '@/shared/components/common/ButtonWithLoading'
import ProductImage from '@/shared/views/home/product-modal/ProductImage'
import IngredientCardList from '@/shared/views/home/product-modal/IngredientCardList'
import ProductItemFilter from '@/shared/views/home/product-modal/ProductItemFilter'
import { productService } from '@/app/api/products/product.service'
import { useRouter } from 'next/navigation'

type Props = {
    id: string
}
type TProduct = Awaited<ReturnType<typeof productService.getProduct>>

const ContentModal = ({ id }: Props) => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const [size, setSize] = useState<number>(1)
    const [sumAddivities, setSumAddivities] = useState<number>(0)
    const [ingredientIds, setIngredientIds] = useState<number[]>([])
    const [typeProduct, setTypeProduct] = useState<PizzaType>(PizzaType.TRADIONAL)
    const {
        data: product,
        isLoading,
        error,
    } = useSWR<TProduct, Error>(`${BASE_URL}/products/${id}`, { fetcher })

    useEffect(() => {
        setIngredientIds([])
        setTypeProduct(PizzaType.TRADIONAL)
    }, [size])

    const addToBasket = async () => {
        setLoading(true)
        const result = await fetch(`${BASE_URL}/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productItemId: product?.items[size - 1].id,
                ingredientIds: ingredientIds,
                pizzaType: typeProduct,
            }),
        })
        return result.ok
    }
    return (
        !isLoading && (
            <>
                <ProductImage size={size} image={product?.image} />
                <div className="max-h-[650px] bg-secondary-foreground rounded-r-[30px] p-10 flex flex-col">
                    <h2 className="text-2xl text-dark font-bold">{product?.name}</h2>
                    <p className="text-secondary-text text-sm">
                        {product?.ingredients && product.ingredients.length > 0
                            ? product?.ingredients.map(e => e.name).join(', ')
                            : product?.description}
                    </p>
                    {product?.items && product.items.length > 1 && (
                        <ProductItemFilter
                            setSumAddivities={setSumAddivities}
                            size={size}
                            items={product?.items}
                            setSize={setSize}
                            typeProduct={typeProduct}
                            setTypeProduct={setTypeProduct}
                        />
                    )}
                    {product?.addivities && product.addivities.length > 0 && (
                        <IngredientCardList
                            size={size}
                            addivities={product?.addivities}
                            setSumAddivities={setSumAddivities}
                            setIngredientIds={setIngredientIds}
                            ingredientIds={ingredientIds}
                        />
                    )}
                    <ButtonWithLoading
                        loading={loading}
                        onClick={async () => {
                            const result = await addToBasket()
                            if (result) {
                                mutate(`${BASE_URL}/cart`)
                                toast.success('Товар добавлен в корзину')
                                setLoading(false)
                                router.back()
                            } else {
                                toast.error('Произошла ошибка')
                                setLoading(false)
                            }
                        }}
                        className="w-full mt-auto"
                        size="lg"
                    >
                        Добавить в корзину за{' '}
                        {Number(product?.items[size - 1].price) + sumAddivities}
                    </ButtonWithLoading>
                </div>{' '}
            </>
        )
    )
}

export default ContentModal
