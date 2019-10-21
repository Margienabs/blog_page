const Comment = require("../models/Comment");

exports.create = ( request, response ) => {
    const reply = new Comment({
        name: request.body.name,
        email: request.body.email,
        subject: request.body.subject,
        message: request.body.message
    });
    response.send(reply)
    // reply.save().then( data => {
    //     return response.send({ success: true, message: data})
    // }).catch( err => {
    //     throw err;
    // })
}


exports.getAll = async (req, res) => {
    try {
        const data = await Comment.find();
        return res.send(data);
    } catch(err){
        return res.status(500).send("there was an error" + err);
    }
}