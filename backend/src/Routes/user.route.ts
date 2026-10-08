import { Router } from "express";
import { createUser, getAllusers } from "../Controllers/user.controller.js";

const router = Router()
router.post('/', createUser);
router.get('/', getAllusers)

export default router;