import express from "express";
import bootstrap from "./src/app.controller.js";
const app =express();
const PORT = process.env.PORT || 4500;
bootstrap(app,express);
console.log(process.env.PORT);

app.listen(PORT, ()=>{
    console.log(`Server is Running http://localhost:${PORT}`);
    
})
