const http = require("http");
const fs = require("fs");
 
http.createServer(async (request, response) => {
    if(request.url == "/server"){
        console.log("qaewqe")
        const arr = [];
        for await (const part of request) {
            arr.push(part);
        } 
        const data = Buffer.concat(arr).toString();
        const json = JSON.parse(data);
        console.log(json);
        response.end("Данные доставлены");
    }
    if (request.url == "/site/style.css") { 
        fs.readFile("./site/style.css", (error, data) => {
            response.write(data);
            response.end()})
    }
    if (request.url == "/site/main.js") { 
        fs.readFile("./site/main.js", (error, data) => {
            response.write(data);
            response.end()})
    }
    else{
        fs.readFile("index.html", (error, data) => {
            response.write(data);
            response.end()})
    }
}).listen(3000, ()=>console.log("Сервер запущен по адресу http://localhost:3000"));