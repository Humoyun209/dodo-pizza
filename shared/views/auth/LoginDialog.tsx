import { Button } from '@/shared/components/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/shared/components/ui/dialog'
import { DialogTitle } from '@radix-ui/react-dialog'
import React, { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import AuthInput from './AuthInput'
import { Github } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { loginSchema, TLogin } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonWithLoading from '@/shared/components/common/ButtonWithLoading'
import RegisterDialog from './RegisterDialog'
import toast from 'react-hot-toast'

type Props = {
    open: boolean
    setOpen: (open: boolean) => void
}

const LoginDialog = ({ open, setOpen }: Props) => {
    const [openRegister, setOpenRegister] = useState<boolean>(false)
    const form = useForm<TLogin>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const handleSignInSubmit = async (data: TLogin) => {
        try {
            const res = await signIn('credentials', {
                ...data,
                redirect: false,
            })
            if (!res?.ok) {
                throw Error(res?.error as string)
            }

            setOpen(false)
            toast.success('Вы успешно вошли')
        } catch (error) {
            console.error(error)
            toast.error('Произошла ошибка при входе')
        }
    }
    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="bg-white max-w-[400px] pt-5">
                    <DialogTitle className="mb-10 w-[80%]">
                        <h1 className="text-2xl font-bold text-start">Вход на сайт</h1>
                        <p className="text-start text-secondary-text text-sm">
                            Подарим подарок на день рождения, сохраним адрес доставки и расскажем об
                            акциях
                        </p>
                    </DialogTitle>
                    <FormProvider {...form}>
                        <form
                            method="POST"
                            onSubmit={form.handleSubmit(handleSignInSubmit)}
                            className="flex flex-col gap-5"
                            autoComplete="off"
                        >
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState: { error } }) => (
                                    <div>
                                        <AuthInput type="email" placeholder="Email" {...field} />
                                        {error && error.message && (
                                            <span className="text-red-500 text-xs mt-1">
                                                {error.message}
                                            </span>
                                        )}
                                    </div>
                                )}
                            />
                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState: { error } }) => (
                                    <div>
                                        <AuthInput
                                            type="password"
                                            placeholder="Password"
                                            {...field}
                                        />
                                        {error && error.message && (
                                            <span className="text-red-500 text-xs mt-1">
                                                {error.message}
                                            </span>
                                        )}
                                    </div>
                                )}
                            />
                            <p className="text-center text-secondary-text text-sm">
                                У вас нет аккаунта?{' '}
                                <span
                                    onClick={() => {
                                        setOpenRegister(true)
                                        setOpen(false)
                                    }}
                                    className="underline text-primary cursor-pointer"
                                >
                                    Регистрация
                                </span>
                            </p>
                            <ButtonWithLoading
                                loading={form.formState.isSubmitting}
                                className="h-12 mt-4"
                                type="submit"
                            >
                                Войти
                            </ButtonWithLoading>
                        </form>
                        <p className="text-center text-base text-dark">OR</p>
                        <div className="flex justify-between gap-4">
                            <Button
                                onClick={() =>
                                    signIn('github', { callbackUrl: '/', redirect: true })
                                }
                                className="bg-dark w-full flex items-center gap-2 hover:bg-[#494949]"
                            >
                                <Github className="text-white" size={14} /> <span>Github</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 text-dark border-dark w-full hover:bg-dark hover:text-white"
                                onClick={() =>
                                    signIn('google', { callbackUrl: '/', redirect: true })
                                }
                            >
                                <img width={14} src="/static/google.svg" alt="" />
                                Google
                            </Button>
                        </div>
                    </FormProvider>
                </DialogContent>
            </Dialog>
            <RegisterDialog open={openRegister} setOpen={setOpenRegister} />
        </>
    )
}

export default LoginDialog
