import { Router } from "express";

import {loginUserController, registerUserController} from '../controllers/auth.js'
const router = Router();
router.post('/login', loginUserController)
router.post('/register', registerUserController)

export default router;