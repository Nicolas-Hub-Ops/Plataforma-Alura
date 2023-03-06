const mongoose = require('mongoose');

const UploadSchema = new mongoose.Schema({
    titulo: String,
    keyInicial: String,
    key1: String,
    key2: String,
    key3: String,
    key4: String,
    key5: String,
    key6: String,
    key7: String,
    key8: String,
    key9: String,
    key10: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Upload', UploadSchema);