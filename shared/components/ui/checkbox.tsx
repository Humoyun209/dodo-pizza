'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { Check } from 'lucide-react'

type Props = {
    checked: boolean
}

const Checkbox = ({ checked }: Props) => {
    return (
        <button className={`p-[5px] rounded-[8px] ${checked ? 'bg-primary' : 'bg-secondary'}`}>
            <Check size={15} strokeWidth={4} stroke={checked ? 'white' : ''} />
        </button>
    )
}

export default Checkbox
