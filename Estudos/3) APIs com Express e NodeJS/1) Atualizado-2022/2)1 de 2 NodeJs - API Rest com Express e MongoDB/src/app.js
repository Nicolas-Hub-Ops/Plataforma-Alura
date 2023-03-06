import express from "express";
import db from "./config/connect.js";
import routes from "./routes/index.js";
import cors from "cors";


db.on("err", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
    console.log("(* The database was connected sucessfully *)")
})


const app = express();
app.use(express.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    app.use(cors());
    next();
})
routes(app);
export default app;