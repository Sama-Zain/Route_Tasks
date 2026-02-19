import mongoose, { mongo } from "mongoose";
import Note from "../../DB/Models/note.model.js";
import User from "../../DB/Models/user.model.js";
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }
        const decoded = jwt.verify(token, "secret");
        req.userId = decoded.userId;
        return next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Error authenticating user" }, error);
    }
}
export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const note = new Note({
            title,
            content,
            userId: req.userId
        });
        const newNote = await note.save();
        return res.status(201).json({ message: "Note created successfully", note: newNote });

    } catch (error) {
        return res.status(500).json({ message: "Error creating note", error: error.message });
    }
};
export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        if (note.userId.toString() !== req.userId.toString()) {
            return res.status(403).json({ message: "You are not the owner" });
        }
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { returnDocument: 'after', runValidators: true }
        );
        return res.status(200).json({ message: "Note updated successfully", note: updatedNote });
    } catch (error) {
        return res.status(500).json({ message: "Error updating note", error: error.message });
    }
};
export const replaceNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        if (note.userId.toString() !== req.userId.toString()) {
            return res.status(403).json({ message: "You are not the owner" });
        }
        const replacenote = await Note.findOneAndReplace(
            { _id: id },
            { title, content, userId: req.userId },
            { returnDocument: 'after', runValidators: true }
        );
        return res.status(200).json({ message: "Note replaced successfully", note: replacenote });
    } catch (error) {
        return res.status(500).json({ message: "Error replacing note", error: error.message });
    }
};
export const updatedAllNotesByUser = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.userId;
        const updatedNotes = await Note.updateMany(
            { userId: req.userId },
            { title },
            { runValidators: true }
        );

        if (updatedNotes.matchedCount === 0) {
            return res.status(404).json({ message: "No notes found" });
        }
        return res.status(200).json({ message: "All notes updated successfully", count: updatedNotes.nModified });
    } catch (error) {
        return res.status(500).json({ message: "Error updating notes", error: error.message });
    }
};
export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndDelete(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        if (note.userId.toString() !== req.userId.toString()) {
            return res.status(403).json({ message: "You are not the owner" });
        }
        return res.status(200).json({ message: "Note deleted successfully", note: note });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting note", error: error.message });
    }
}; export const paginateNotes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const userId = req.userId;
        const skip = (page - 1) * limit;
        const notes = await Note.find({ userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalNotes = await Note.countDocuments({ userId });

        return res.status(200).json({
            message: "Notes fetched successfully",
            notes,
            totalNotes,
            currentPage: page,
            totalPages: Math.ceil(totalNotes / limit)
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching notes", error: error.message });
    }
};
export const getNodyById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        if (note.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not the owner" });
        }
        return res.status(200).json({ message: "Note fetched successfully", note });

    } catch (error) {
        return res.status(500).json({ message: "Error fetching note", error: error.message });
    }
}

export const getNodyByContent = async (req, res) => {
    try {
        const { content } = req.query;
        const userId = req.userId;
        const note = await Note.findOne({ content: content });
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        if (note.userId.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not the owner" });
        }
        return res.status(200).json({ message: "Note fetched successfully", note });

    } catch (error) {
        return res.status(500).json({ message: "Error fetching note", error: error.message });
    }
}

export const deleteAllNotesByUser = async (req, res) => {
    try {
        const userId = req.userId;
        const deletedNotes = await Note.deleteMany(
            { userId: req.userId },
        );
        if (deletedNotes.deletedCount === 0) {
            return res.status(404).json({ message: "No notes found" });
        }
        return res.status(200).json({ message: "All notes deleted successfully", count: deletedNotes.deletedCount });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting notes", error: error.message });
    }
};
export const getAllNotesByUser = async (req, res) => {
    try {
        const userId = req.userId;
        const notes = await Note.find({ userId })
            .select("title userId createdAt ")
            .populate({
                path: "userId",
                select: " email -_id"
            });
        if (notes.length === 0) {
            return res.status(404).json({ message: "No notes found" });
        }
        return res.status(200).json({ message: "All notes fetched successfully", notes });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching notes", error: error.message });
    }
};
export const getNoteAggregate = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.query;
        const notes = await Note.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    title: { $regex: title || "", $options: "i" }
                }
            },
            {
                $lookup: {
                    from: "User",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    userId: 1,
                    createdAt: 1,
                    user: {
                        email: 1,
                        name: 1
                    }
                }
            }
        ]);
        if (notes.length === 0) {
            return res.status(404).json({ message: "No notes found" });
        }
        return res.status(200).json({ message: "Note aggregate fetched successfully", notes });

    } catch (error) {
        return res.status(500).json({ message: "Error fetching notes", error: error.message });
    }
}