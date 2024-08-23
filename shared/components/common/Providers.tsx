'use client'

import React, { PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import NextTopLoader from 'nextjs-toploader'

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <SessionProvider>{children}</SessionProvider>
            <Toaster />
            <NextTopLoader color="#FE5F00" zIndex={10000} speed={400} />
        </>
    )
}

export default Providers
