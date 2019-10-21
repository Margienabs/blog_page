Contact = require('../models/contactModel');

exports.index = function (req, res) {
    let pageNo = parseInt(req.query.pageNo);
    let size = parseInt(req.query.size);
    let query = {};
    if(pageNo < 0 || pageNo === 0 ){
        response = {"error": true, "message": "invalid"};
        return res.send(response);
    }
    query.skip = size * (pageNo - 1 );
    query.limit = size;
    Contact.find({},{}, query, function(err,data){
        if(err){
            response = {"error": true,"message": "error fetching data"}
        } else {
            response = {"success": true,"message": data}
        }
            res.json({
            status: "success",
            message: "Comments retrieved successfully",
            data: response
        });
    })
    // Contact.get(function (err, contacts) {
    //     if (err) {
    //         res.json({
    //             status: "error",
    //             message: err,
    //         });
    //     }
    //     res.json({
    //         status: "success",
    //         message: "Contacts retrieved successfully",
    //         data: contacts
    //     });
    // });
};
// Handle create contact actions
exports.new = function (req, res) {
    var contact = new Contact();
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.email = req.body.email;
    contact.subject = req.body.subject;
    contact.message = req.body.message;
    res.json(contact);
    contact.save(function (err) {
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New comment created!',
                data: contact
            });
    });
};
// Handle view contact info
exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
// save the contact and check for errors
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};