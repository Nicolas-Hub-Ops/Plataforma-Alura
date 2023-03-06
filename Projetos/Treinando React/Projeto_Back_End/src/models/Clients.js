const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    Foto: String,
    Nome: String,
    Email: String,
    Telefone: Number,
    País: String,
    Estado: String,
    CPF: Number,
    Endereco: String,
    EstadoCivil: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Client', ClientSchema);