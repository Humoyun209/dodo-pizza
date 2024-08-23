import { NextRequest, NextResponse } from "next/server"
import { categoryService } from "./category.service"

export const GET = async (req: NextRequest) => {
    const categories = await categoryService.getCategories()
    return NextResponse.json({categories: categories}, {status: 200})
}