import { userRouter , noteRouter } from "./Modules/index.js";
import connectDB from "./DB/connections.js";

const bootstrap = async (app , express) => {
   app.use(express.json());
   await connectDB();
   app.use("/users",userRouter);
   app.use("/notes",noteRouter);
   app.all("/*dummy", (req, res) => {
      res.status(404).send("Not Found Handler");
   });
}

export default bootstrap;
