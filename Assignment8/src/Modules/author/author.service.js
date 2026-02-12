import { db } from "../../DB/connections.js";

export const createAuthor = async (req, res) => {
    try {
       const author = await db.collection("authors").insertOne(req.body);
        return res.status(201).json({ message: "Author created successfully", author });
    } catch (error) {
        res.status(400).json({ message: "Failed to create author", error: error.message });
        
    }

};