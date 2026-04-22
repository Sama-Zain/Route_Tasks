import { User } from "./User.js";
import type { NoteBook } from "./NoteBook.js";

export class Admin extends User {
    constructor(id: number, name: string, email: string, password: string, phone: string, age: number) {
        super(id, name, email, password, phone, age);
        
    }
    // manage notes
    public deleteNote(notebook: NoteBook, noteId: number): void {
        console.log(`Admin ${this.name} is accessing the system to delete a note...`);
        notebook.removeNote(noteId);
    }
    public createNote(notebook: NoteBook, title: string, content: string): void {
        console.log(`Admin ${this.name} is accessing the system to create a new note...`);
        notebook.addNote(this.id, title, content, this);
    }
    
}
