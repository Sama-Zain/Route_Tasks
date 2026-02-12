import { db } from "../../DB/connections.js";
export const createlogs = async (req, res) => {
    try {
        await db.createCollection("logs", {
            capped: true,
            size: 1024 * 1024 ,  // 1 MB
            max: 10
        });
        res.status(201).json({ message: "Log created successfully" });

    } catch (error) {
        res.status(400).json({ message: "Failed to create log", error: error.message });

    }
}
export const insertlogs = async (req, res) =>{
    try {
        const result = await db.collection("logs").insertOne(req.body);
        return res.status(201).json({ message: "Log inserted successfully", result });
    } catch (error) {
        res.status(400).json({ message: "Failed to insert log", error: error.message });
    } 
}