import { Note } from "./Note.js";
import type { User } from "./User.js";

export class NoteBook {
    public id: number;
    public name: string;
    private notes: Note[] = []; // objects

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    // add note to notebook (relationship: composition)
    public addNote(noteId: number, title: string, content: string, user: User): void {
        const note = new Note(noteId, title, content, user);
        this.notes.push(note);
        console.log(`Note "${title}" has been created and added to the notebook.`);
    }
    // remove note from notebook
    public removeNote(noteId: number): void {
        const note = this.notes.find(note => note.id === noteId);
        if (note) {
            this.notes = this.notes.filter(n => n.id !== noteId);
            console.log(`Note "${note.title}" has been removed from the notebook.`);
        }
    }
    public getNotes(): Note[] {
        return this.notes;
    }
}
