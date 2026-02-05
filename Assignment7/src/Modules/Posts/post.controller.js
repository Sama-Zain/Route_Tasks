import {Router} from 'express';
import * as postService from './post.service.js';
const router = Router();
router.post('/', postService.createPost); // http://localhost:3000/posts/
router.delete('/:id', postService.deletePost); // http://localhost:3000/posts/1
router.get('/details', postService.getPostDetails); // http://localhost:3000/posts/details
router.get('/comment-count', postService.getAllPosts); // http://localhost:3000/posts/comment-count
export default router;
