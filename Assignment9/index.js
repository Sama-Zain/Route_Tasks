import express from "express";
import dotenv from "dotenv";
import bootstrap from "./src/app.controller.js";
dotenv.config({ path: "./config/.env" });
const app = express();
const port = process.env.PORT;
 bootstrap(app , express);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});