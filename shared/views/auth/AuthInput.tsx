import React, { forwardRef } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

const AuthInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
    return (
        <input
            ref={ref}
            className="w-full rounded-none outline-none border-b-2 border-secondary px-3 py-2 text-sm focus:border-primary"
            {...props}
        />
    )
})

export default AuthInput
