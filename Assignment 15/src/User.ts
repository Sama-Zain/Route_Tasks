import type { NoteBook } from "./NoteBook.js";

export class User {
    public id: number;
    public name: string;
    public email: string;
    private password: string;
    public phone: string;
    private age: number;
    public notebooks: NoteBook[]=[];
    constructor(id: number, name: string, email: string, password: string, phone: string, age: number) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
    }
    getAge(): number {
        return this.age;
    }   
    getPassword(): string {
        return this.password;
    }
    public set age_user(value: number) {
        if(value <18 || value > 60 ){
            throw new Error("Age should be between 18 and 60");
        }
        this.age = value;
    } 
    // Aggregation

    public addNotebook(notebook: NoteBook): void {
        this.notebooks.push(notebook);
    }
    public displayInfo(): void {
        console.log(`User Info :
            Id: ${this.id}
            Name: ${this.name}
            Email: ${this.email}
            Password: ${this.getPassword()}
            Phone: ${this.phone}
            Age: ${this.getAge()}
            `);
    }
}