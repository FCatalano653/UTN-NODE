import { Router } from "express";
import { authController } from "../controllers/authController.js";

export const router = Router()
router.post('/register', authController.registerUser)
router.post('/login', authController.login)
//router.get("/users", authController.getAll)