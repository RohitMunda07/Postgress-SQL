import { Router } from "express";
import { createPost, deletePost, getAllPost, getPostById, getPostByUserId } from "../Controllers/post.controller.js";

const router = Router()

router.get('/', getAllPost)
router.post('/', createPost)
router.get('/user/:userId', getPostByUserId)
router.get('/:postId', getPostById)
router.delete('/', deletePost)

export default router;