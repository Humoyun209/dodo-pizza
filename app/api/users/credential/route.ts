import { prisma } from '@/prisma/prisma.client'
import { ICredentialUser } from '@/types/user.credential'
import { hash } from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
    const credentialData: ICredentialUser = await req.json()
    if (credentialData.password != credentialData.confirmPassword) {
        return NextResponse.json({ message: 'Паролы не совпадают' }, { status: 400 })
    }
    const user = await prisma.user.findFirst({
        where: {
            OR: [{ email: credentialData.email }, { username: credentialData.username }],
        },
    })
    if (user) {
        return NextResponse.json(
            { message: 'Пользователь с такими данными уже существует' },
            { status: 400 },
        )
    }

    const newUser = await prisma.user.create({
        data: {
            username: credentialData.username,
            email: credentialData.email,
            password: await hash(credentialData.password, 10),
        },
        select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    })
    return NextResponse.json(newUser, { status: 201 })
}
