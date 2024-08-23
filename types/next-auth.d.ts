import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            id: number
            email: string
            username: string
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: number
        email: string
        username: string
    }
}
