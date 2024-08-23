'use client'
import React from 'react'

type Props = {
    size: number
    image?: string
}

const ProductImage = ({ image, size }: Props) => {
    return (
        <div className="max-h-650px] bg-white rounded-l-[30px] border-none flex justify-center items-center relative">
            <img
                width={size == 1 ? 300 : size == 2 ? 350 : 400}
                className="transition-all duration-200"
                src={image}
                alt=""
            />
        </div>
    )
}

export default ProductImage
