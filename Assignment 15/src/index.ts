import { User } from "./User.js";
import { Admin } from "./Admin.js";
import { NoteBook } from "./NoteBook.js";
import { Note } from "./Note.js";
import { Storage } from "./Storage.js";
try {
    const user1 = new User(1, "Sama", "sama@route.com", "securePass123", "01012345678", 22);
    const user2 = new User(2, "Lina", "lina@route.com", "pass456", "01123456789", 25);
    
    console.log("--- User Information ---");
    user1.displayInfo(); 
    user2.displayInfo();

    const admin1 = new Admin(3, "Zain", "admin@route.com", "admin789", "01198765432", 30);

    console.log("--- Admin Information ---");
    admin1.displayInfo();
    const notebook1 = new NoteBook(101, "TypeScript Assignment");
    const notebook2 = new NoteBook(102, "OOP Deep Dive");

    user1.addNotebook(notebook1);
    user1.addNotebook(notebook2);
    user2.addNotebook(notebook1); 

    console.log(`${user1.name} owns ${user1.notebooks.length} notebook(s).`);

    console.log("--- Adding Notes ---");
    notebook1.addNote(501, "OOP Principles",    "Learning Inheritance and Composition", user1);
    notebook1.addNote(502, "Generics in TS",    "How to use Generic classes and functions", user1);
    notebook2.addNote(601, "Design Patterns",   "Singleton, Factory, Observer patterns overview", user2);
    
    console.log("--- Admin Actions ---");
    admin1.createNote(notebook1, "System Update", "Admin added a system-wide note for all users");
    admin1.deleteNote(notebook1, 502); 

        
    console.log("--- Note Previews (Association with Author) ---");
    notebook1.getNotes().forEach(note => {
        console.log(`  [Note #${note.id}] "${note.title}" by ${note.author.name} → ${note.preview()}`);
    });
    const noteStorage = new Storage<Note>();
    noteStorage.addItem(new Note(901, "Archived Note",  "This note is stored in generic storage", user1));
    noteStorage.addItem(new Note(902, "Backup Note",    "Another note kept in storage", user2));

    const userStorage = new Storage<User>();
    userStorage.addItem(user1);
    userStorage.addItem(user2);
    userStorage.addItem(admin1); 

    const notebookStorage = new Storage<NoteBook>();
    notebookStorage.addItem(notebook1);
    notebookStorage.addItem(notebook2);

    console.log(`  Stored Notes    : ${noteStorage.getItems().length}`);
    console.log(`  Stored Users    : ${userStorage.getItems().length}`);
    console.log(`  Stored Notebooks: ${notebookStorage.getItems().length}`);
    console.log(`  Notes after remove: ${noteStorage.getItems().length}`);
    console.log("System ran successfully.");

} catch (error: any) {
    console.error("System Error:", error.message);
}
