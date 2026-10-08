import prisma from "../../config/prisma.js";
import { Request, Response } from "express";

export const createPost = async (req: Request, res: Response) => {
    const { userId, title, description } = req.body;
    console.log(req.body)
    if ([userId, title, description].some(field => field.toString().trim() === '')) {
        throw new Error("Some fields are missing")
    }

    const newPost = await prisma.post.create({
        data: {
            userId: Number(userId),
            title,
            description
        }
    })

    if (!newPost) {
        throw new Error("Error creating the post")
    }

    return res.status(201).json({ status: 201, data: newPost, message: "Post Created Successfully" })
}

export const getPostByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;
    if (!userId) {
        throw new Error("User Id is required")
    }

    const existingPost = await prisma.post.findMany({
        where: {
            userId: Number(userId)
        }
    })

    if (existingPost.length === 0) {
        throw new Error("No Post found")
    }

    return res.status(200).json({ status: 200, data: existingPost, message: "fetched post by userId" })
}

export const getAllPost = async (req: Request, res: Response) => {
    const allPosts = await prisma.post.findMany();

    if (allPosts.length === 0) {
        throw new Error("No post available")
    }

    return res.status(200).json({ status: 200, data: allPosts, message: "Fetched All Post" })
}

export const getPostById = async (req: Request, res: Response) => {
    const { postId } = req.params
    if (!postId) {
        throw new Error("Post id is required")
    }

    const existingPost = await prisma.post.findUnique({ where: { id: Number(postId) } })
    if (!existingPost) {
        throw new Error("No post found on this id")
    }

    return res.status(200).json({ status: 200, data: existingPost, message: "fetched post by id" })
}
export const deletePost = async (req: Request, res: Response) => {
    const { postId } = req.body()
    if (!postId) {
        throw new Error("Post id is required")
    }

    const existingPost = await prisma.post.delete({ where: { id: Number(postId) } })
    if (!existingPost) {
        throw new Error("No post found on this id")
    }

    return res.status(200).json({ status: 200, data: {}, message: "post deleted sucessfully" })
}
