const Http = require("http");
const fs = require("fs");
const Express = require("express");
const BodyParser = require("body-parser");
const json = require("./form.json");

const app = Express();
app.use(BodyParser.urlencoded({extended:true}));
app.use(BodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('Access-Control-Max-Age', 1728000)
    if (req.method === 'OPTIONS') {
        return res.json({ status: 0, message: '', payload: null })
    }
    next();
});

app.get("/",(request, response) => {
    let data;
    try {
        data = fs.readFileSync("./form.json");
    }
    catch( error ){
        return response.send('there was an error' +error);
        // response.writeHead( 404, {"context-type":"text/plain"});
        // response.write('404 File not found');
        // response.end();
        // return;
    }

    if(data){
        return response.send(data);
        // response.writeHead( 200, { "content-type": "text/plain"});
        // response.write(file1);
        // response.end();
    }
});

app.post("/addcomment", (request,response) => {
    const { email, name, subject, message } = request.body;

    fs.readFile("./form.json", (err, data) => {  // READ
        if (err) {
            return console.error(err);
        };
        var returned = JSON.parse(data);
        console.log(returned);

        // var writeData = fs.writeFile("./form.json", JSON.stringify(returned), (err, result) => {  // WRITE
        //     if (err) {
        //         return console.error(err);
        //     } else {
        //         console.log(result);
        //         console.log("Success");
        //     }
    
        // });
    });
    // var node = json.head, next;
    // try {
    //      while(node){
    //         next = node.head;
    //         if(node.head === null){
    //             node.head = { name, email, message, subject, head: null };
    //             fs.writeFile("./form.json", JSON.stringify(json, null, 2), err => {
    //                 if(err){
    //                     throw err;
    //                 }
    //             });
    //             break;
    //         } else {
    //             node = next;
    //         }
    //     }
    //     return response.send('done');
        
    // } catch(error){
    //     throw error;
    // }
    
});

app.listen( 4000, () => {
    console.log("Server is running on port 4000");
});


// const server = Http.createServer( (request, response) => {
//     let file1;
//     try {
//         file1 = fs.readFileSync("../index.html");

//     }
//     catch( error ){
//         response.writeHead( 404, {"context-type":"text/plain"});
//         response.write('404 File not found');
//         response.end();
//         return;
//     }

//     if(file1){
//         response.writeHead( 200, { "content-type": "text/plain"});
//         response.write(file1);
//         response.end();
//     }




//     request.on("data", data => {
//         console.log('blockade' + data)
//         // var arr = decodeURIComponent(data).replace(/\+/g, ' ').replace('UserName=', '')
//         // .replace('Email=', '').replace('message=', '').split('&');
//         // var node = json.head;
//         // var next;

//         // while(node){
//         //     next = node.head;
//         //     if(node.head === null){
//         //         node.head = { name: arr[0], email: arr[1], message: arr[2], head: null };
//         //         fs.writeFile("./form.json", JSON.stringify(json, null, 2), err => {
//         //             if(err){
//         //                 throw err;
//         //             }
//         //         });
//         //         break;
//         //     } else {
//         //         node = next;
//         //     }
//         // }
//     });
// }).listen( 3000, () => {
//     console.log('Server running on 3000');
// });
