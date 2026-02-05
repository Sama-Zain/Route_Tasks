import { Router } from 'express';
import * as userService from './user.service.js';
const router = Router();

router.post('/signup', userService.createUser); // http://localhost:3000/users/signup
router.put('/:id', userService.upsertUser); // http://localhost:3000/users/1
router.get('/', userService.getuserbyemail); // http://localhost:3000/users/email=test@test.com
router.get('/:id', userService.getuserbyid); // http://localhost:3000/users/1


export default router;