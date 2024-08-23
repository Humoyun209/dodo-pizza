import { create } from "zustand"


export type SetCategoryType = {
    categoryId: number
    setCategoryId: (id: number) => void
}


export const useCategoryId = create<SetCategoryType>()((set) => ({
    categoryId: 1,
    setCategoryId: (id: number) => set({categoryId: id})
}))