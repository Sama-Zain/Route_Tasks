import type { User } from "./User.js";

export class Note {
    public id: number;
    public title: string;
    public content: string;
    public author: User; // relationship: association
    constructor(id: number, title: string, content: string, user: User) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = user;
    }
    public preview(): string {
        if (this.content.length > 30) {
            return this.content.substring(0, 30) + "...";
        }
        return this.content;
    }

}