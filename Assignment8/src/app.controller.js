import { connectdb } from "../src/DB/connections.js";
import { authorRouter,bookRouter,logRouter } from "./Modules/index.js";
const bootstrap = async (app,express)=>{
   app.use(express.json());
   await connectdb();

   app.use("/collection", bookRouter);
   app.use("/collection", authorRouter);
   app.use("/collection", logRouter);

   app.use("/books",bookRouter);
   app.use("/logs",logRouter);
   app.use("/authors",authorRouter);
   
   app.use("/*dummy",(req,res)=>{
      res.status(404).json({message:"Page not found"});
   });


}
export default bootstrap;