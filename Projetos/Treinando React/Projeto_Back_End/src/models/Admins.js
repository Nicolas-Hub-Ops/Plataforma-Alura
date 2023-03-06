
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    Username: String,
    Email: String,
    Password: String,
    AdminToken: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Admin', AdminSchema);