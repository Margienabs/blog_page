const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
})
module.exports = mongoose.model("Comment", commentSchema)