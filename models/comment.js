const mongoose =require("Mongoose");

const commentSchema = mongoose.Schema({
    name:String,
    email: String,
    subject: String,
    message: String
})

var Comment = module.exports = mongoose.model("comment", commentSchema);