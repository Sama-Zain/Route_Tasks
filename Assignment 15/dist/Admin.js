import { User } from "./User.js";
export class Admin extends User {
    constructor(id, name, email, password, phone, age) {
        super(id, name, email, password, phone, age);
    }
    // manage notes
    deleteNote(notebook, noteId) {
        console.log(`Admin ${this.name} is accessing the system to delete a note...`);
        notebook.removeNote(noteId);
    }
    createNote(notebook, title, content) {
        console.log(`Admin ${this.name} is accessing the system to create a new note...`);
        notebook.addNote(this.id, title, content, this);
    }
}
