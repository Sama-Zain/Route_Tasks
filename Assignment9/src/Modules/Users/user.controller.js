import { Router } from "express";
import * as userService from "./user.service.js";

const router = Router();
router.post("/signup", userService.createUser); // http://localhost:3000/users/signup
router.post("/login", userService.loginUser); // http://localhost:3000/users/login
router.patch("/", userService.auth, userService.updateUser); // http://localhost:3000/users
router.delete("/", userService.auth, userService.deleteUser); // http://localhost:3000/users
router.get("/", userService.auth, userService.getUser); // http://localhost:3000/users
 export default router;
