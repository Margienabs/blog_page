const boom = require("boom");
const Comment = require("../models/Comment");

exports.getComments = async( request, response) => {
    try {
        const comments = await Comment.find();
        return comments;
    }
    catch(err){
        throw boom.boomify(err);
    }
}

exports.addComment = async ( request, response ) => {
    var object = {
        "name": "Legal",
        "email": "catalonia@gmail.com",
        "subject": "alexa",
        "message": "xega aint right"
    };
    response.send(object);
    // try {
    //     const comment = new Comment(request.body);
    //     return comment.save();
    // } catch(error){
    //     throw boom.boomify(error);
    // }
}