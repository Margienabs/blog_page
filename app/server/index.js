// const Http = require("http");
// const fs = require("fs");
// const Express = require("express");
// const BodyParser = require("body-parser");
// const json = require("./form.json");

// const app = Express();
// app.use(BodyParser.urlencoded({extended:true}));
// app.use(BodyParser.json());

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Credentials', true)
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With')
//     res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
//     res.header('Access-Control-Max-Age', 1728000)
//     if (req.method === 'OPTIONS') {
//         return res.json({ status: 0, message: '', payload: null })
//     }
//     next();
// });

// app.get("/",(request, response) => {
//     let data;
//     try {
//         data = fs.readFileSync("./form.json");
//     }
//     catch( error ){
//         return response.send('there was an error' +error);
//         // response.writeHead( 404, {"context-type":"text/plain"});
//         // response.write('404 File not found');
//         // response.end();
//         // return;
//     }

//     if(data){
//         //return response.send(data);
//         // response.writeHead( 200, { "content-type": "text/plain"});
//         // response.write(file1);
//         // response.end();
//     }
// });

// app.post("/addcomment", (request,response) => {
//     const { email, name, subject, message } = request.body;

//     let rawdata = fs.readFileSync('student.json');
//     let student = JSON.parse(rawdata);
//     let newArray = student.data;

//     let student2 = { 
//         name: 'Mike',
//         age: 30, 
//         gender: 'Male',
//         department: 'Bena',
//         car: 'Kent' 
//     };
//     let data = newArray.push(student2);
//     fs.writeFileSync('student.json', JSON.stringify(newArray, null, 4), err => {
//         if(err) throw err;
//         console.log('data is saved');
//     });   
// });

// app.listen( 4000, () => {
//     console.log("Server is running on port 4000");
// });
const routes = require("./routes");
const fastify = require("fastify")({
    logger: true
});
fastify.register(require('fastify-cors'),{
    //put your options here
})
const mongoose = require("mongoose");

routes.forEach((route,index)=>{
    fastify.route(route);
})
fastify.get("/", async( request, response ) => {
    return { test: "here" };
} )

mongoose.connect("mongodb://localhost/dbase").then(
    () => console.log("Mongo is connected")
).catch( err => console.log( err ))

const start = async () => {
    try {
        await fastify.listen(4000);
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    }
    catch(err){
        fastify.log.error(err);
        process.exit(1);
    }
}

start();