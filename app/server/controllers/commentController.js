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
    response.send('we are here')
    // try {
    //     const comment = new Comment(request.body);
    //     return comment.save();
    // } catch(error){
    //     throw boom.boomify(error);
    // }
}