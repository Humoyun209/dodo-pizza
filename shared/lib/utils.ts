import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const returnArray = (count: number) => {
  let result = []
  for (let i = 1; i <= count; i++) {
    result.push(i)
  }
  return result
}


export const sumPrice = (price: number, add: number) => {
  return price + add
}