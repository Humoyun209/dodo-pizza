import { prisma } from "@/prisma/prisma.client"

class CategoryService {

    async getCategories() {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true
            }
        })
        return categories
    }
}


export const categoryService = new CategoryService()