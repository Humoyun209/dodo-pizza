import ButtonWithLoading from '@/shared/components/common/ButtonWithLoading'
import { Button } from '@/shared/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { User } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import LoginDialog from '../../auth/LoginDialog'

type Props = {}

export const ProfileButton = (props: Props) => {
    const session = useSession()
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
            {' '}
            {session.status == 'loading' && (
                <ButtonWithLoading loading changeWidth variant="outline">
                    {' '}
                </ButtonWithLoading>
            )}
            {session.status == 'unauthenticated' && (
                <Button
                    onClick={() => setOpen(true)}
                    variant={'outline'}
                    className="flex items-center gap-1"
                >
                    <User size={18} strokeWidth={2} />
                    <b>Войти</b>
                </Button>
            )}
            {session.status == 'authenticated' && (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={'outline'} className="flex items-center gap-1">
                            <User size={18} strokeWidth={2} />
                            <b>Профил</b>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-min px-0">
                        <div className="text-dark flex flex-col text-sm font-semibold my-1 rounded-sm border border-[#e7e7e7]">
                            <Link
                                href="/profile"
                                className="py-2 pl-3 pr-6 hover:bg-primary-muted hover:bg-[#ffeee0] rounded-t-sm"
                            >
                                Настройки
                            </Link>
                            <Link
                                href="/orders"
                                className=" py-2 pl-3 pr-6 hover:bg-primary-muted hover:bg-[#ffeee0]"
                            >
                                Заказы
                            </Link>
                            <button
                                onClick={() => signOut({ callbackUrl: '/', redirect: false })}
                                className="text-start py-2 pl-3 pr-6 hover:bg-primary-muted hover:bg-[#ffeee0] rounded-b-sm"
                            >
                                Выйти
                            </button>
                        </div>
                    </PopoverContent>
                </Popover>
            )}
            <LoginDialog open={open} setOpen={setOpen} />
        </>
    )
}
