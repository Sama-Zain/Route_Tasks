export class Note {
    id;
    title;
    content;
    author; // relationship: association
    constructor(id, title, content, user) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = user;
    }
    preview() {
        if (this.content.length > 30) {
            return this.content.substring(0, 30) + "...";
        }
        return this.content;
    }
}
