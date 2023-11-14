// Create web server application
// Run node comments.js
// Test by visiting http://localhost:3000
// ----------------------------------

// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    console.log("request starting...");

    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './comments.html';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT'){
                fs.readFile('./404.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                response.end();
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(content, 'utf-8');
        }
    });

    // response.writeHead(200, {"Content-Type": "text/plain"});
    // response.end("Hello World\n");
});

// Listen on port 3000, IP defaults to
