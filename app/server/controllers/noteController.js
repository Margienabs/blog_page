const Note = require("../models/Note");

exports.create = (req,res) => {
    if(!req.body.content){
        return res.status(400).send({
            message: "content cannot be empty"
        });
    }
    const note = new Note({
        title: "Untitled title" || req.body.note,
        content: req.body.content
    });
    note.save().then( data => res.send(data) ).catch( err => {
        res.status(500).send({
            message: err.message || "some error occured please"
        })
    })

}

exports.getAll = async (req, res) => {
    try {
        const notes = await Note.find();
        return res.send(notes);
    } catch(err){
        return res.status(500).send("there was an error" + err);
    }
}