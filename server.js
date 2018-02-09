var http = require('http');
var url = require('url');
var fs = require('fs');  
var path = require('path');   
var filePath = path.join(__dirname,'data');  

http.createServer(function (request, response) {

    var pathname = url.parse(request.url).pathname;   
    if(pathname == "/favicon.ico")
        return; 
    
    if(pathname == "/"){
        pathname = "index.html";
    }

    console.log("Request for " + pathname + " received.");
    
    fs.exists(path.join(__dirname,pathname),function(exists){
        if(exists){
            switch(path.extname(pathname)){
                case ".html":
                {
                    response.writeHead(200, {"Content-Type": "text/html"});
                    switch(pathname){
                        case "index.html":
                                var files = fs.readdirSync(filePath);
                                files.forEach(function(filename){
                                    var filedir = path.join(filePath,filename);
                                    var fsstat = fs.statSync(filedir);
                                    if(fsstat.isDirectory()){
                                        var str='"./viewer.html?name='+filename+'"';
                                        response.write('<a href='+str+'>'+filename+'</a>');
                                        response.write('</br>');
                                    }
                                });
                                response.end('');
                            break;
                        case "/viewertest.html":
                                fs.readFile(__dirname+url.parse(request.url).pathname,function (err,data){
                                    console.log(__dirname+url.parse(request.url).pathname);
                                    response.end(data);
                                });
                            break;
                        case "/viewer.html":
                                fs.readFile(__dirname+url.parse(request.url).pathname,function (err,data){
                                    console.log(__dirname+url.parse(request.url).pathname);
                                    response.end(data);
                                });
                            break;
                        default:
                            response.writeHead(404, {"Content-Type": "text/html"});
                            response.end("<h1>404 Not Found</h1>");
                    }  
                break;       
                }  
                case ".js":
                {
                    response.writeHead(200, {"Content-Type": "text/javascript"});
                    fs.readFile(__dirname+url.parse(request.url).pathname,function (err,data){
                        response.end(data);
                    });                
                break;    
                }
                case ".css":
                {
                    response.writeHead(200, {"Content-Type": "text/css"});
                    fs.readFile(__dirname+url.parse(request.url).pathname,function (err,data){
                        response.end(data);
                    });                
                break;    
                }              
                case ".jpg":
                {
                    response.writeHead(200, {"Content-Type": "image/jpeg"});
                    fs.readFile(__dirname+url.parse(request.url).pathname,function (err,data){
                        response.end(data);
                    });                
                break;    
                }
                case ".png":
                {
                    response.writeHead(200, {"Content-Type": "image/png"});
                    fs.readFile(__dirname+url.parse(request.url).pathname,function (err,data){
                        response.end(data);
                    });                
                break;    
                }
                case ".csv":
                {
                    response.writeHead(200,{"Content-Type": "text/plain"});
                    var filedata = fs.readFileSync(__dirname+url.parse(request.url).pathname,"utf-8");
                    response.write(filedata);
                    response.end("");
                    break;
                }
                default:
                {
                    response.writeHead(200, {"Content-Type": "application/octet-stream"});
                    fs.readFile(__dirname+url.parse(request.url).pathname,function (err,data){
                    response.end(data);
                    });                
                }
            }
        } 
        else {
            console.log(pathname+" not exist");
            response.writeHead(404, {"Content-Type": "text/html"});
            response.end("<h1>404 Not Found</h1>");
        }
    }); 
}).listen(8888);
