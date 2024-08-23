import { prisma } from "@/prisma/prisma.client"
import { NextResponse } from "next/server"

export const GET = async () => {
    const ingredients = await prisma.ingredient.findMany({
        select: {
            id: true,
            name: true,
        },
        orderBy: {
            priceMin: "asc"
        }
    })
    return NextResponse.json(ingredients, {status: 200})
}