import React, { forwardRef } from 'react'
import { Button, ButtonProps } from '../ui/button'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/shared/lib/utils'

interface Props extends ButtonProps {
    loading?: boolean
    changeWidth?: boolean
    sizeCircle?: number
    children: React.ReactNode
}

const ButtonWithLoading = forwardRef<HTMLButtonElement, Props>(
    ({ variant, size, className, loading, children, changeWidth, sizeCircle, ...props }, ref) => {
        return (
            <Button
                ref={ref}
                variant={variant}
                size={size}
                className={cn(className, loading && changeWidth && `w-[100px]`)}
                disabled={!!loading}
                {...props}
            >
                {loading ? (
                    <LoaderCircle size={sizeCircle || 24} className="animate-spin" />
                ) : (
                    children
                )}
            </Button>
        )
    },
)

export default ButtonWithLoading
