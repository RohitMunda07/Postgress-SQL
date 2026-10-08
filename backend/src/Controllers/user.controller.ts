import prisma from "../../config/prisma.js";
import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // check for existing email
    const existingEmail = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (existingEmail) {
        throw new Error("This email alread exist");
    }

    const newUser = await prisma.user.create({
        data: {
            name, email, password
        }
    })

    if (!newUser) {
        throw new Error("Error creating new User")
    }

    return res.json({ status: 200, message: "User created successfully" })
}

export const getAllusers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        include: {
            posts: {
                select: {
                    title: true,
                    comment_count: true
                }
            }
        }
    });
    if (users.length === 0) {
        throw new Error("Error fetching users")
    }

    return res.status(200).json({ status: 200, data: users, message: "User Fetched successfully" })
}