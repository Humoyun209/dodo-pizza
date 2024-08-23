import { z } from 'zod'

const ZPassword = z
    .string()
    .min(4, { message: 'Длина пароля минимум 4 символов!' })
    .max(20, { message: 'Длина пароля максимум 20 смиволов' })

export const loginSchema = z.object({
    email: z.string().email({ message: 'Не валидный email!' }),
    password: ZPassword,
})

export const registerSchema = loginSchema
    .merge(
        z.object({
            username: z.string().min(4, { message: 'Длина имени минимум 4 символов!' }).max(20, {
                message: 'Длина имени максимум 20 символов!',
            }),
            confirmPassword: ZPassword,
        }),
    )
    .refine(data => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают!',
        path: ['confirmPassword'],
    })

export type TLogin = z.infer<typeof loginSchema>
export type TRegister = z.infer<typeof registerSchema>
