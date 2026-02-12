import express from "express";
import dotenv from "dotenv";
import bootstrap from "./src/app.controller.js";
dotenv.config({ path: "./src/config/.env" });

const app = express();
bootstrap(app,express);
const port = process.env.PORT || 4500;

 app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});