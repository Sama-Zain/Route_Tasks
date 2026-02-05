import {Router} from 'express';
import * as commentService from './comment.service.js';

const router = Router();
router.post('/', commentService.createBulkComments); //http://localhost:3000/comments/
router.patch('/:id', commentService.updateComment); //http://localhost:3000/comments/1
router.post('/find-or-create', commentService.upsertComment); //http://localhost:3000/comments/find-or-create
router.get('/search', commentService.searchComments); //http://localhost:3000/comments/search?word=This
router.get('/newest/:postId', commentService.getRecentComments); //http://localhost:3000/comments/newest/1
router.get('/details/:id', commentService.getComment); //http://localhost:3000/comments/details/1
export default router;