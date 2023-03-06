import express from "express";
import db from "./config/connect.js";
import routes from "./routes/index.js";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

db.on("err", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
    console.log("(* The database was connected sucessfully *)")
})

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    app.use(cors());
    next();
});


routes(app);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.${path.extname(file.originalname)}`);
    }
  });
  
const upload = multer({ storage });

app.post('/upload/images', upload.single('file'));

export default app;
