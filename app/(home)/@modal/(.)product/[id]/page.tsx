import ProductModal from '@/shared/views/home/product-modal'

type Props = {
    params: {
        id: string
    }
}

const ProductModalPage = ({ params: { id } }: Props) => {
    return <ProductModal id={id} />
}

export default ProductModalPage
