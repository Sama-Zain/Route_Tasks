const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const fs = require("fs");
const path = require("path");


const filePath = path.join(__dirname, "users.json");

function readUsers() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data || "[]");
}

function writeUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}
//1
app.post("/users", (req, res) => {  //http://localhost:3000/users
  const { name, email, age } = req.body;

  if (!name || !email || age === undefined) {
    return res.status(400).json({ message: "Name, email and age are required" });
  }

  const users = readUsers();
  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    age
  };

  users.push(newUser);
  writeUsers(users);

  res.status(201).json({
    message: "User added successfully",
    user: newUser
  });
});
//2
app.patch("/user/:id", (req, res) => {  //http://localhost:3000/user/ID
  const id = Number(req.params.id);
  const { name, email, age } = req.body;

  const users = readUsers();
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  if (email) {
    const emailExists = users.find(
      u => u.email === email && u.id !== id
    );
    if (emailExists) {
      return res.status(409).json({ message: "Email already exists" });
    }
  }

  users[index] = {
    ...users[index],
    ...(name && { name }),
    ...(email && { email }),
    ...(age !== undefined && { age })
  };

  writeUsers(users);

  res.json({ message: "User updated successfully", user: users[index] });
});
//3
app.delete("/user/:id", (req, res) => { //http://localhost:3000/user/ID
  const id = Number(req.params.id || req.body.id);

  if (!id) {
    return res.status(400).json({ message: "User id is required" });
  }

  const users = readUsers();
  const newUsers = users.filter(u => u.id !== id);

  if (newUsers.length === users.length) {
    return res.status(404).json({ message: "User not found" });
  }

  writeUsers(newUsers);
  res.json({ message: "User deleted successfully" });
});
//4
app.get("/user/getByName", (req, res) => { //http://localhost:3000/user/getByName?name=Sama
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: "Name query is required" });
  }

  const users = readUsers();
  const user = users.find(u => u.name === name);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});
//5
app.get("/users", (req, res) => { //http://localhost:3000/users
  const users = readUsers();
  res.json(users);
});
//6
app.get("/user/filter", (req, res) => { //http://localhost:3000/user/filter?minAge
  const minAge = Number(req.query.minAge);

  if (isNaN(minAge)) {
    return res.status(400).json({ message: "minAge query is required" });
  }

  const users = readUsers();
  const filtered = users.filter(u => u.age >= minAge);

  res.json(filtered);
});
//7
app.get("/user/:id", (req, res) => {  //http://localhost:3000/user/ID
  const id = Number(req.params.id);

  const users = readUsers();
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

app.listen(port, () => {
  console.log(`server is Running http://localhost:${port}`);

})

