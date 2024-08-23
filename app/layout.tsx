import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import NextTopLoader from 'nextjs-toploader'
import localFont from 'next/font/local'
import './globals.css'
import { cn } from '@/shared/lib/utils'
import { ReactQueryClientProvider } from '@/shared/components/common/QueryClientProvider'
import Link from 'next/link'
import Providers from '@/shared/components/common/Providers'

const nunito = localFont({
    src: [
        {
            path: '../public/fonts/Nunito-Light.ttf',
            weight: '300',
            style: 'light',
        },
        {
            path: '../public/fonts/Nunito-Regular.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../public/fonts/Nunito-Medium.ttf',
            weight: '500',
            style: 'medium',
        },
        {
            path: '../public/fonts/Nunito-SemiBold.ttf',
            weight: '600',
            style: 'semibold',
        },
        {
            path: '../public/fonts/Nunito-Bold.ttf',
            weight: '700',
            style: 'bold',
        },
        {
            path: '../public/fonts/Nunito-ExtraBold.ttf',
            weight: '800',
            style: 'extrabold',
        },
        {
            path: '../public/fonts/Nunito-Black.ttf',
            weight: '900',
            style: 'black',
        },
    ],
    variable: '--font-nunito',
})

export const metadata: Metadata = {
    title: 'Next Pizza',
    description: 'Next Pizza for ever',
}

type Props = {
    children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
    return (
        <ReactQueryClientProvider>
            <html lang="en">
                <body className={cn(nunito.variable, 'font-nunito bg-primary-foreground')}>
                    <main className="max-w-[1400px] bg-white mx-auto rounded-[30px] m-8 py-11">
                        <Providers>{children}</Providers>
                    </main>
                </body>
            </html>
        </ReactQueryClientProvider>
    )
}
