var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	name:  String,
	email: String,
	subject: String,
	message: String,
	create_date: {
        type: Date,
    	default: Date.now
    }
}),
User = mongoose.model('user', userSchema);

module.exports = User;