import mongoose from "mongoose";


mongoose.connect('mongodb+srv://Nicolas:admin@cluster0.tqfjg.mongodb.net/Album-Cars');

let db = mongoose.connection;

export default db;


// RESPONSAVEL PELA CONEXÃO COM O BANCO DE DADOS POR MEIO DA DEPENDENCIA 'MONGOOSE' 