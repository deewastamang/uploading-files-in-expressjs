

const mongoose = require('mongoose');

const UploadSchema = new mongoose.Schema({
    filename: String,
    path: String,
})

const UploadModel = mongoose.model('Uploads', UploadSchema);
module.exports = UploadModel;