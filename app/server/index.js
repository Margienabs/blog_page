// const routes = require("./routes");
// const express = require("express");
// const path = require("path");
// const fastify = require("fastify")({
//     logger: true
// });
// fastify.register(require('fastify-cors'),{
//     //put your options here
// })
// const mongoose = require("mongoose");

// routes.forEach((route,index)=>{
//     fastify.route(route);
// })
// fastify.get("/", async( request, response ) => {
//     console.log('running..');
// } );

// fastify.post("/test", async( request, response ) => {
//     return response.send(request.body);
// } )

// mongoose.connect("mongodb://localhost/dbase").then(
//     () => console.log("Mongo is connected")
// ).catch( err => console.log( err ))


// const start = async () => {
//     try {
//         await fastify.listen(4000);
//         fastify.log.info(`server listening on ${fastify.server.address().port}`)
//     }
//     catch(err){
//         fastify.log.error(err);
//         process.exit(1);
//     }
// }

// start();
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var controller1 = require("./controllers/noteController");

mongoose.connect("mongodb://localhost/dbase").then(
    () => console.log("Mongodb is connected")
);

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'server')));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '../../', 'test.html'));
})

app.post('/post-feedback', controller1.create);

app.get('/view-feedbacks',  function(req, res) {
    res.send("all uni")
});

app.listen(process.env.PORT || 4000, process.env.IP || '0.0.0.0' );