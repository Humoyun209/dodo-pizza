import NextAuth, { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/prisma/prisma.client'
import { compare, hash } from 'bcrypt'

export const authOptions: AuthOptions = {
    secret: process.env.SECRET_KEY,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',
        }),
        CredentialsProvider({
            name: 'Авторизация',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Пароль', type: 'password' },
            },
            async authorize(credentials, req) {
                const email = credentials?.email
                const password = credentials?.password

                if (!email || !password) {
                    return null
                }

                const user = await prisma.user.findFirst({
                    where: {
                        email: email,
                    },
                })
                if (!user) {
                    return null
                }

                const isValid = await compare(password as string, user?.password || '')
                if (!isValid) {
                    return null
                }

                return {
                    id: String(user.id),
                    email: user.email,
                    name: user.username,
                    image: user.avatar,
                }
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token }) {
            const user = await prisma.user.findFirst({
                where: {
                    email: token?.email as string,
                },
            })
            if (user) {
                token.id = user.id
                token.email = user.email
                token.username = user.username
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.email = token.email || ''
                session.user.name = token.name
                session.user.id = token.id
            }
            return session
        },
        async signIn({ account, user, profile }) {
            console.log('Account', account)
            console.log('Profile', profile)
            console.log('User', user)
            try {
                if (account?.provider == 'credentials') {
                    return true
                }
                if (!user.email) {
                    return false
                }
                const userData = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { provider: account?.provider, providerId: account?.providerAccountId },
                            { email: user.email },
                        ],
                    },
                })

                if (userData) {
                    await prisma.user.update({
                        where: {
                            email: user.email,
                        },
                        data: {
                            provider: account?.provider,
                            providerId: account?.providerAccountId,
                        },
                    })
                    return true
                }
                await prisma.user.create({
                    data: {
                        username: (profile && 'login' in profile
                            ? (profile?.login as string)
                            : profile?.name) as string,
                        avatar: user?.image,
                        password: await hash(account?.providerAccountId || '', 10),
                        email: user.email,
                        provider: account?.provider,
                        providerId: account?.providerAccountId,
                    },
                })
                return true
            } catch (error) {
                console.log(error)
                return false
            }
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
