'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import Container from '@/shared/components/ui/container'
import Link from 'next/link'
import SearchHeader from './SearchHeader'
import CartDrawer from '../cart/CartDrawer'
import { ProfileButton } from './ProfileButton'

type Props = {
    className?: string
    search?: boolean
}

const Header = (props: Props) => {
    const ref = useRef<HTMLButtonElement>(null)
    return (
        <header>
            <Container className="flex justify-between items-center">
                <Link href="/" className="flex gap-[15px] items-center ">
                    <Image width={40} height={40} src="/pizza-logo.svg" alt="" />
                    <div className=" flex flex-col gap-0">
                        <h3 className="text-2xl font-black text-dark">NEXT PIZZA</h3>
                        <span className="text-secondary-text text-base">
                            вкусней уже точно некуда
                        </span>
                    </div>
                </Link>
                <SearchHeader />
                <div className="flex items-center gap-4">
                    <ProfileButton />
                    <CartDrawer />
                </div>
            </Container>
        </header>
    )
}

export default Header
