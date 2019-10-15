const Http = require("http");
const fs = require("fs");
const json = require("../data.json");
let file;

const server = Http.createServer( (request, response) => {
    let file1;
    try {
        file1 = fs.readFileSync("../index.html");

    }
    catch( error ){
        response.writeHead( 404, {"context-type":"text/plain"});
        response.write('404 File not found');
        response.end();
        return;
    }

    if(file1){
        response.writeHead( 200, { "content-type": "text/plain"});
        response.write(file1);
        response.end();
    }




    request.on("data", data => {
        var arr = decodeURIComponent(data).replace(/\+/g, ' ').replace('UserName=', '')
        .replace('Email=', '').replace('message=', '').split('&');
        var node = json.head;
        var next;

        while(node){
            next = node.head;
            if(node.head === null){
                node.head = { name: arr[0], email: arr[1], message: arr[2], head: null };
                fs.writeFile("./form.json", JSON.stringify(json, null, 2), err => {
                    if(err){
                        throw err;
                    }
                });
                break;
            } else {
                node = next;
            }
        }
    });
}).listen( 3000, () => {
    console.log('Server running on 3000');
});
