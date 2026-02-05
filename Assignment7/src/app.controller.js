import dotenv from "dotenv";
dotenv.config({ path: './src/config/dev.env' }); 
import { User, Post, Comment } from "./DB/Models/Models.js" // Ensure models are imported 
import { syncTables, testConnection } from "./DB/connection.js";
import { userRouter, postRouter, commentRouter } from "./Modules/index.js";

const bootstrap = async (app, express) => {
    app.use(express.json());

    await testConnection();
    await syncTables(); 

    app.use("/users", userRouter);
    app.use("/posts", postRouter);
    app.use("/comments", commentRouter);

    app.use('/*dummy', (req, res) => {
        res.status(404).json({ message: "Not Found Handler!" });
    });
};

export default bootstrap;