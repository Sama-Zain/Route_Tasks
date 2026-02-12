import { db } from "../../DB/connections.js";
//1
export const createExplicitBooks = async (req, res) => {
    try {
        await db.createCollection("books", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["title"],
                    properties: {
                        title: {
                            bsonType: "string",
                            description: "must be a string and is required",
                            minLength: 1
                        }
                    }
                }
            }
        });
        return res.status(201).json({ message: "Collection book created successfully" });

    } catch (error) {
        res.status(400).json({ message: "Failed to create collection book", error: error.message });
    }
}
//4
export const createIndex = async (req, res) => {
    try {
        await db.collection("books").createIndex({ title: 1 }, { unique: true });
        return res.status(201).json({ message: "Index created successfully" });

    } catch (error) {
        res.status(400).json({ message: "Failed to create index", error: error.message });
    }
}
//5
export const inserBook = async (req, res) => {
    try {
        const result = await db.collection("books").insertOne(req.body);
        return res.status(201).json({ message: "Book inserted successfully", result });
    } catch (error) {
        res.status(400).json({ message: "Failed to insert book", error: error.message });
    }
}
//6
export const inserManyBooks = async (req, res) => {
    try {
        const result = await db.collection("books").insertMany(req.body);
        return res.status(201).json({ message: "Books inserted successfully", result });
    } catch (error) {
        res.status(400).json({ message: "Failed to insert books", error: error.message });
    }
}
//8
export const updateBook = async (req, res) => {
    try {
        const { title, newYear } = req.body;
        const result = await db.collection("books").updateOne(
            { title: title },
            { $set: { year: newYear } }
        );
        res.status(200).json({ message: "Updated", result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
//9
export const getbookbytitle = async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        const result = await db.collection("books").findOne({ title: title });
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book found", result });

    } catch (error) {
        res.status(400).json({ message: "Failed to get book by title", error: error.message });
    }
};
//10
export const getBookByYearRange = async (req, res) => {
    try {
        const { from, to } = req.query;
        if (!from || !to) {
            return res.status(400).json({ message: "Year is required" });
        }
        const result = await db.collection("books").find({
            year: {
                $gte: Number(from),
                $lte: Number(to)
            }
        }).toArray();
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book found", result });

    } catch (error) {
        res.status(400).json({ message: "Failed to get book by year", error: error.message });
    }
}
//11
export const getbookbygenre = async (req, res) => {
    try {
        const { genre } = req.query;
        if (!genre) {
            return res.status(400).json({ message: "Genre is required" });
        }
        const result = await db.collection("books").find({
            genres: genre
        }).toArray();
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book found", result });

    } catch (error) {
        res.status(400).json({ message: "Failed to get book by title", error: error.message });
    }
};
//12
export const getbookbySkipLimit = async (req, res) => {
    try {
        const result = await db.collection("books")
            .find({})
            .skip(2)
            .limit(3)
            .sort({ year: -1 })
            .toArray();
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book found", result });

    } catch (error) {
        res.status(400).json({ message: "Failed to get book by title", error: error.message });
    }

};
//13
export const getbookbyYearType = async (req, res) => {
    try {
        const result = await db.collection("books")
            .find({
                year: { $type: "int" }
            }).toArray();
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book found", result });

    } catch (error) {
        res.status(400).json({ message: "Failed to get book by year type", error: error.message });
    }
};
//14
export const excludeGenre = async (req, res) => {
    try {
        const result = await db.collection("books")
            .find({
                genres: { $nin: ["Horror", "Science Fiction"] }
            }).toArray();
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book found", result });

    } catch (error) {
        res.status(400).json({ message: "Failed to get book by year type", error: error.message });
    }
};
//15
export const deletebookbeforeYear = async (req, res) => {
    try {
        const { year } = req.query;
        if (!year) {
            return res.status(400).json({ message: "Year is required" });
        }
        const result = await db.collection("books").deleteMany({
            year: { $lt: parseInt(year) }
        });
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted", result });

    } catch (error) {
        res.status(400).json({ message: "Failed to delete book", error: error.message });
    }
};
//16
export const getAggregate1 = async (req, res) => {
    try {
        const result = await db.collection("books").aggregate([
            {
                $match: {
                    year: { $gte: 2000 }
                }
            },
            {
                $sort: { year: -1 }
            }
        ]).toArray();
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book found", result });
    } catch (error) {
        res.status(400).json({ message: "Failed to get aggregate", error: error.message });
    }
};
//17
export const getAggregate2 = async (req, res) => {
    try {
        const result = await db.collection("books").aggregate([
            {
                $match: {
                    year: { $gte: 2000 }
                }
            },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    author: 1,
                    year: 1,
                }
            }
        ]).toArray();
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book found", result });
    } catch (error) {
        res.status(400).json({ message: "Failed to get aggregate", error: error.message });
    }
};
//18
export const getAggregate3 = async (req, res) => {
    try {
        const result = await db.collection("books").aggregate([
            {
                $unwind: "$genres"
            }
        ]).toArray();
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({
            message: "Array unwinded successfully",
            count: result.length,
            result
        });
    } catch (error) {
        res.status(400).json({ message: "Failed to get aggregate", error: error.message });
    }
};
//19
export const getAggregate4 = async (req, res) => {
    try {
        const result = await db.collection("logs").aggregate([
            {
                $lookup: {
                    from: "books",
                    let: { log_book_id: "$book_id" }, 
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: [{ $toString: "$_id" }, "$$log_book_id"]
                                }
                            }
                        },
                        { $project: { _id: 0, title: 1, author: 1, year: 1 } }
                    ],
                    as: "book_details"
                }
            },
            {
                $project: {
                    _id: 0,
                    action: 1,
                    book_details: 1
                }
            }
        ]).toArray();
        if (!result) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book details found", result });

    } catch (error) {
        res.status(400).json({ message: "Aggregation failed", error: error.message });
    }
};