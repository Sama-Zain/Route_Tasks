import { Router } from "express";
import * as noteService from "./note.service.js";
const router = Router();
router.post("/", noteService.auth, noteService.createNote);  // http://localhost:3000/notes

router.patch("/all", noteService.auth, noteService.updatedAllNotesByUser); // http://localhost:3000/notes/all
router.get("/paginate", noteService.auth, noteService.paginateNotes);// http://localhost:3000/notes/paginate
router.delete("/", noteService.auth, noteService.deleteAllNotesByUser);// http://localhost:3000/notes
router.get("/note-by-content", noteService.auth, noteService.getNodyByContent);// http://localhost:3000/notes/note-by-content
router.get("/note-with-user", noteService.auth, noteService.getAllNotesByUser);// http://localhost:3000/notes/note-with-user
router.get("/aggregate", noteService.auth, noteService.getNoteAggregate);// http://localhost:3000/notes/aggregate

router.put("/replace/:id", noteService.auth, noteService.replaceNote);// http://localhost:3000/notes/replace/:id
router.patch("/:id", noteService.auth, noteService.updateNote);// http://localhost:3000/notes/:id
router.delete("/:id", noteService.auth, noteService.deleteNote);// http://localhost:3000/notes/:id
router.get("/:id", noteService.auth, noteService.getNodyById);//  http://localhost:3000/notes/:id

export default router;