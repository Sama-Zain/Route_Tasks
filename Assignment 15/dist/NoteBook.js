import { Note } from "./Note.js";
export class NoteBook {
    id;
    name;
    notes = []; // objects
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    // add note to notebook (relationship: composition)
    addNote(noteId, title, content, user) {
        const note = new Note(noteId, title, content, user);
        this.notes.push(note);
        console.log(`Note "${title}" has been created and added to the notebook.`);
    }
    // remove note from notebook
    removeNote(noteId) {
        const note = this.notes.find(note => note.id === noteId);
        if (note) {
            this.notes = this.notes.filter(n => n.id !== noteId);
            console.log(`Note "${note.title}" has been removed from the notebook.`);
        }
    }
    getNotes() {
        return this.notes;
    }
}
