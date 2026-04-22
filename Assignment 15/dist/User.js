export class User {
    id;
    name;
    email;
    password;
    phone;
    age;
    notebooks = [];
    constructor(id, name, email, password, phone, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
    }
    getAge() {
        return this.age;
    }
    getPassword() {
        return this.password;
    }
    set age_user(value) {
        if (value < 18 || value > 60) {
            throw new Error("Age should be between 18 and 60");
        }
        this.age = value;
    }
    // Aggregation
    addNotebook(notebook) {
        this.notebooks.push(notebook);
    }
    displayInfo() {
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
