import { db } from "../connections.js";
const AuthorModel = db.collection("authors");
export default AuthorModel;