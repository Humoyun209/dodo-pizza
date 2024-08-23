import { User } from "@prisma/client"
import {prisma } from "@/prisma/prisma.client"
import argon2 from "argon2"

type UserWithoutDate = Omit<User, "createdAt" | "updatedAt">
class UserService {
    async createUser (data: UserWithoutDate) {
        const newUser = await prisma.user.create({
            data: {
                ...data,
                password: await argon2.hash(data.password)
            },
            select: {
                username: true,
                email: true,
                avatar: true,
                createdAt: true,
                updatedAt: true
            },
        })
        return newUser
    }
}


export const userService = new UserService()