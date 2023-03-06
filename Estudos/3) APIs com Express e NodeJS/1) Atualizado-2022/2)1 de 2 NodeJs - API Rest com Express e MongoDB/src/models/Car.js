import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
    {
    id: {type: String},
    fabricante: {type: String, required: true},
    modelo: {type: String, required: true},
    info: {type: mongoose.Schema.Types.ObjectId, ref: "mores", required: false}
    }
);

const cars = mongoose.model('Cars', carSchema);

export default cars;

// Responsável pelas relações com schema do Banco de Dados, Cria caso não tenha... (modelo dos arquivos do banco de dados) 