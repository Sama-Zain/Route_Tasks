import fs from "fs";
import http from "http";
import { parse } from "url";

const port = 3000;
const FILE = "./users.json";

function readUsers() {
  const data = fs.readFileSync(FILE, "utf8");
  return JSON.parse(data);
}

function writeUsers(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  const { pathname } = parse(req.url, true);
  const method = req.method;

  /* ADD USER */
  if (method === "POST" && pathname === "/user") {
    let body = "";

    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const newUser = JSON.parse(body);
      const data = readUsers();

      const emailExists = data.users.find(
        (user) => user.email === newUser.email
      );

      if (emailExists) {
        res.end(JSON.stringify({ message: "Email already exists." }));
        return;
      }

      newUser.id = data.users.length + 1;
      data.users.push(newUser);
      writeUsers(data);

      res.end(JSON.stringify({ message: "User added successfully." }));
    });
  }

  /* UPDATE USER */
  else if (method === "PATCH" && pathname.startsWith("/user/")) {
    const id = Number(pathname.split("/")[2]);
    let body = "";

    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const updates = JSON.parse(body);
      const data = readUsers();

      const user = data.users.find((u) => u.id === id);
      if (!user) {
        res.end(JSON.stringify({ message: "User ID not found." }));
        return;
      }

      Object.assign(user, updates);
      writeUsers(data);

      res.end(JSON.stringify({ message: "User updated successfully." }));
    });
  }

  /* DELETE USER */
  else if (method === "DELETE" && pathname.startsWith("/user/")) {
    const id = Number(pathname.split("/")[2]);
    const data = readUsers();

    const index = data.users.findIndex((u) => u.id === id);
    if (index === -1) {
      res.end(JSON.stringify({ message: "User ID not found." }));
      return;
    }

    data.users.splice(index, 1);
    writeUsers(data);

    res.end(JSON.stringify({ message: "User deleted successfully." }));
  }

  /* GET ALL USERS */
  else if (method === "GET" && pathname === "/users") {
    const data = readUsers();
    res.end(JSON.stringify(data.users));
  }

  /* GET USER BY ID */
  else if (method === "GET" && pathname.startsWith("/user/")) {
    const id = Number(pathname.split("/")[2]);
    const data = readUsers();

    const user = data.users.find((u) => u.id === id);
    if (!user) {
      res.end(JSON.stringify({ message: "User ID not found." }));
      return;
    }

    res.end(JSON.stringify(user));
  }

  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
