import {Router} from "express";
import * as bookService from "./book.service.js";
const router= Router();
// collection
router.post("/books",bookService.createExplicitBooks); //http://localhost:3000/collection/books
router.post("/books/index",bookService.createIndex); //http://localhost:3000/collection/books/index
// books
router.post("/",bookService.inserBook); //http://localhost:3000/books
router.post("/batch",bookService.inserManyBooks); //http://localhost:3000/books/batch
router.patch("/Future",bookService.updateBook); //http://localhost:3000/books/Future
router.get("/title",bookService.getbookbytitle); //http://localhost:3000/books/title 
router.get("/year",bookService.getBookByYearRange); //http://localhost:3000/books/year  
router.get("/genre",bookService.getbookbygenre); //http://localhost:3000/books/genre
router.get("/skip-limit",bookService.getbookbySkipLimit); //http://localhost:3000/books/skip-limit
router.get("/year-integer",bookService.getbookbyYearType); //http://localhost:3000/books/year-integer
router.get("/exclude-genre",bookService.excludeGenre); //http://localhost:3000/books/exclude-genre
router.get("/delete-before-year",bookService.deletebookbeforeYear); //http://localhost:3000/books/delete-before-year
router.get("/aggregate1",bookService.getAggregate1); //http://localhost:3000/books/aggregate1
router.get("/aggregate2",bookService.getAggregate2); //http://localhost:3000/books/aggregate2
router.get("/aggregate3",bookService.getAggregate3); //http://localhost:3000/books/aggregate3
router.get("/aggregate4",bookService.getAggregate4); //http://localhost:3000/books/aggregate4
export default router;

