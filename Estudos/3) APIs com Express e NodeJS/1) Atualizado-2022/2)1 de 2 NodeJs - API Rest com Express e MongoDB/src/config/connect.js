import mongoose from "mongoose";

mongoose.connect('mongodb+srv://Nicolas:admin@cluster0.tqfjg.mongodb.net/NodeJs-Express-MongoDB');

let db = mongoose.connection;

export default db;


// RESPONSAVEL PELA CONEXÃO COM O BANCO DE DADOS POR MEIO DA DEPENDENCIA 'MONGOOSE' 