import { prisma } from '@/prisma/prisma.client'
import { fileService } from '@/shared/lib/backend/file.service'
import { User } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
    const data = await req.json()
    return NextResponse.json({ Соси: 'Хуй' })
}
