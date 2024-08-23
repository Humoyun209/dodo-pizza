import { create } from "zustand";

export type TSorted = "price" | "alphabet" | "rating"

interface ProductFilterType {
    ingredients: number[]
    minPrice: number
    maxPrice: number,
    isNew: boolean,
    isCollected: boolean,
    sortedBy: TSorted,
    loading: boolean,
    isSubmitted: boolean,

    setIsSubmitted: (isSubmitted: boolean) => void,
    setLoading: (loading: boolean) => void,
    setSortedBy: (sortBy: TSorted) => void
    setIsNew: (isNew: boolean) => void
    setIsCollected: (isCollected: boolean) => void
    setIngredients: (ingredients: number[]) => void
    setMinPrice: (minPrice: number) => void
    setMaxPrice: (maxPrice: number) => void
}


export const useProductFilter = create<ProductFilterType>((set) => ({
    ingredients: [],
    minPrice: 100,
    maxPrice: 1000,
    isNew: false,
    isCollected: false,
    sortedBy: "rating",
    loading: false,
    isSubmitted: false,

    setIsSubmitted: (isSubmitted: boolean) => set({isSubmitted}),
    setLoading: (loading: boolean) => set({loading}),
    setSortedBy: (sortedBy: TSorted) => set({sortedBy}),
    setIsNew: (isNew) => set({isNew}),
    setIsCollected: (isCollected) => set({isCollected}),
    setIngredients: (ingredients: number[]) => set({ingredients}),
    setMinPrice: (minPrice: number) => set({minPrice}),
    setMaxPrice: (maxPrice: number) => set({maxPrice}),
}))