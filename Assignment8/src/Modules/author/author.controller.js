import {Router} from "express";
import * as authorService from "./author.service.js";
const router= Router();
router.post("/authors",authorService.createAuthor); //http://localhost:3000/collection/authors  

export default router;