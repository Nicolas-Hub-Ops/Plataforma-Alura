import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
    {
    id: {type: String},
    title: {type: String, required: true},
    img: {type: String, required: true},
    imgs: {type: mongoose.Schema.Types.ObjectId, ref: "images", required: false}
    }
);

const album = mongoose.model('Album', albumSchema);

export default album;

// Responsável pelas relações com schema do Banco de Dados, Cria caso não tenha... (modelo dos arquivos do banco de dados) 