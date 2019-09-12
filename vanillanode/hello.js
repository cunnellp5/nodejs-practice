// Load HTTP module
const http = require("http");

const hostname = "127.0.0.1";
const port = 8000;

let hello = ''

// Create HTTP server 
const server = http.createServer((req, res) => {
   // Set the response HTTP header with HTTP status and Content type
   res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
   // Send the response body "Hello World"
    for (let i = 0; i < 20000; i++) {
        hello+='🧙‍♂️'
    }

   res.end(hello);
});

// Prints a log once the server starts listening
server.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
})