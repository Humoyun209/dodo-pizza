import { cn } from '@/shared/lib/utils'
import React from 'react'

type Props = {
    className?: string
}

const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
    return <div className={cn('max-w-[1300px] mx-auto', className)}>{children}</div>
}

export default Container
