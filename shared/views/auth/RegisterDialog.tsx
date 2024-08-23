import { Dialog, DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import AuthInput from './AuthInput'
import ButtonWithLoading from '@/shared/components/common/ButtonWithLoading'
import { Button } from '@/shared/components/ui/button'
import { Github } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, TRegister } from './schema'
import LoginDialog from './LoginDialog'
import { ICredentialUser } from '@/types/user.credential'
import toast from 'react-hot-toast'

type Props = {
    open: boolean
    setOpen: (open: boolean) => void
}

const RegisterDialog = ({ open, setOpen }: Props) => {
    const form = useForm<TRegister>({
        mode: 'onChange',
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const handleRegister = async (data: TRegister) => {
        try {
            const res = await fetch('/api/users/credential', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!res.ok) {
                console.log(res)
                throw Error('Something went wrong')
            }
            const newUser: ICredentialUser = await res.json()
            const signInRes = await signIn('credentials', {
                email: newUser.email,
                password: data.password,
                redirect: false,
            })
            if (!signInRes?.ok) {
                throw Error(signInRes?.error as string)
            }
            setOpen(false)
            toast.success('Вы успешно зарегистрировались')
        } catch (error) {
            console.error(error)
            toast.error('Произошла ошибка при регистрации')
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="bg-white max-w-[400px] pt-5">
                <DialogTitle className="mb-10 w-[80%]">
                    <h1 className="text-2xl font-bold text-start">Регистрация</h1>
                    <p className="text-start text-secondary-text text-sm">
                        Зарегистрируйтесь прямо сейчас, получите подарки и приятные бонусы
                    </p>
                </DialogTitle>
                <FormProvider {...form}>
                    <form
                        method="POST"
                        onSubmit={form.handleSubmit(handleRegister)}
                        className="flex flex-col gap-5"
                        autoComplete="off"
                    >
                        <Controller
                            name="username"
                            control={form.control}
                            render={({ field, fieldState: { error } }) => (
                                <div>
                                    <AuthInput type="text" placeholder="Username" {...field} />
                                    {error && error.message && (
                                        <span className="text-red-500 text-xs mt-1">
                                            {error.message}
                                        </span>
                                    )}
                                </div>
                            )}
                        />
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
                                    <AuthInput type="password" placeholder="Password" {...field} />
                                    {error && error.message && (
                                        <span className="text-red-500 text-xs mt-1">
                                            {error.message}
                                        </span>
                                    )}
                                </div>
                            )}
                        />

                        <Controller
                            name="confirmPassword"
                            control={form.control}
                            render={({ field, fieldState: { error } }) => (
                                <div>
                                    <AuthInput
                                        type="password"
                                        placeholder="confirmPassword"
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
                        <ButtonWithLoading
                            loading={form.formState.isSubmitting}
                            className="h-12 mt-4"
                            type="submit"
                        >
                            Зарегистрироваться
                        </ButtonWithLoading>
                    </form>
                    <p className="text-center text-base text-dark">OR</p>
                    <div className="flex justify-between gap-4">
                        <Button
                            onClick={() => signIn('github', { callbackUrl: '/', redirect: true })}
                            className="bg-dark w-full flex items-center gap-2 hover:bg-[#494949]"
                        >
                            <Github className="text-white" size={14} /> <span>Github</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 text-dark border-dark w-full hover:bg-dark hover:text-white"
                            onClick={() => signIn('google', { callbackUrl: '/', redirect: true })}
                        >
                            <img width={14} src="/static/google.svg" alt="" />
                            Google
                        </Button>
                    </div>
                </FormProvider>
            </DialogContent>
        </Dialog>
    )
}

export default RegisterDialog
