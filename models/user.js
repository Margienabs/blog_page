var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	name:  {
        type: String,
    	required:true
    },
	email: {
        type: String,
    	required:true
    },
	subject: {
        type: String,
    	required:true
    },
	message: {
        type: String,
    	required:true
    },
	create_date: {
        type: Date,
    	default: Date.now
    }
}),
User = mongoose.model('user', userSchema);

module.exports = User;