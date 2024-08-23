import Header from '@/shared/views/home/header/Header'
import HeaderOfCategories from '@/shared/views/home/header/HeaderOfCategories'
import LeftFilter from '@/shared/views/home/filters'
import Container from '@/shared/components/ui/container'
import CatalogOfProducts from '@/shared/views/home/catalog'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Главная страница',
    description: 'Самая вкусная пицца в мире',
}

export default function Home() {
    return (
        <>
            <Header />
            <HeaderOfCategories />
            <Container className=" grid grid-cols-10 mt-9 gap-8">
                <LeftFilter />
                <CatalogOfProducts />
            </Container>
        </>
    )
}
