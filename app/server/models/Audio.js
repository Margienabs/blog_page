var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/demodb");
var mongoSchema = mongoose.Schema;

const userSchema = {
    "firstName": String,
    "lastName": String,
    "email": String,
    "gender": String,
    "ip_address": String
};
module.exports = mongoose.model("users", userSchema)