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


// var express = require('express');
// var path = require('path');
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// var controller1 = require("./controllers/noteController");

// mongoose.connect("mongodb://localhost/dbase").then(
//     () => console.log("Mongodb is connected for post")
// );

// var app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.resolve(__dirname, 'server')));

// app.get('/', (req,res)=>{
//     res.sendFile(path.join(__dirname, '../../', 'test.html'));
// })

// app.post('/post-feedback', (request,response) => {
//     console.log(request);
// // });

// app.get('/view-feedbacks',  controller1.getAll);

// app.listen(process.env.PORT || 4000, process.env.IP || '0.0.0.0' );


// const express = require("express");
// const bodyParser = require("body-parser")
// const mongoose = require("mongoose");
// const path = require("path");
// const mongoOp= require("./models/Comment");
// var controller1 = require("./controllers/noteController");
// var controller2 = require("./controllers/commentsController");

// mongoose.connect("mongodb://localhost/dbase").then(
//     () => console.log("Mongodb is connected")
// );
// const app = express();

// const router = express.Router();
// app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', (req,res)=>{
//     res.sendFile(path.join(__dirname, '../../', 'test.html'));
// })


// app.post('/api/post-feedback-test', controller1.create);

// router.get('/view-feedback', controller2.getAll);

// router.get("/allData", (req,res) => {
//     let response;
//     var pageNo = parseInt(req.query.pageNo);
//     var size = parseInt(req.query.size);
//     var query = {};
//     if(pageNo < 0 || pageNo === 0 ){
//         response = {"error": true, "message": "invalid"};
//         return res.send(response);
//     }
//     query.skip = size * (pageNo - 1 );
//     query.limit = size;
//     mongoOp.find({},{}, query, function(err,data){
//         if(err){
//             response = {"error": true,"message": "error fetching data"}
//         } else {
//             response = {"success": true,"message": data}
//         }
//         res.json(response)
//     })
// })
// //app.use('/api', router);
// // app.listen(4000);
// app.listen(process.env.PORT || 4000, process.env.IP || '0.0.0.0' );








let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialize the app
let app = express();
//let mongoOp= require("./models/commentModel");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    /*var err = new Error('Not Found');
     err.status = 404;
     next(err);*/
  
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  
  //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    // Pass to next layer of middleware
    next();
  });

// Import routes
let apiRoutes = require("./api-routes");
// Configure bodyparser to handle post requests

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});

// Heroku Mongoose connection
// mongoose.connect('mongodb://heroku_5686p02g:sia8l3fni4jmu7qbn0ac1t75mf@ds349857.mlab.com:49857/heroku_5686p02g', { useNewUrlParser: true });

var db = mongoose.connection;

// Added check for DB connection

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));


// app.get("/getAllComments", (req,res) => {
//     let response;
//     var pageNo = parseInt(req.query.pageNo);
//     var size = parseInt(req.query.size);
//     var query = {};
//     if(pageNo < 0 || pageNo === 0 ){
//         response = {"error": true, "message": "invalid"};
//         return res.send(response);
//     }
//     query.skip = size * (pageNo - 1 );
//     query.limit = size;
//     res.json(query);
    // mongoOp.find({},{}, query, function(err,data){
    //     if(err){
    //         response = {"error": true,"message": "error fetching data"}
    //     } else {
    //         response = {"success": true,"message": data}
    //     }
    //     res.json(response);
    // })
//})
app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running server on the port " + port);
});









