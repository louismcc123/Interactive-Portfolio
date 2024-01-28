const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';  // Assuming you have an index.html file
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    let contentType = 'text/html';  // Set default content type

    if (extname === '.js') {
        contentType = 'text/javascript';  // Set correct content type for JavaScript files
    }

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('Not Found');
            } else {
                console.error(`Error reading file ${filePath}: ${error.code}`);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`Internal Server Error: ${error.code}`);
            }
        } else {
            console.log(`Serving ${filePath} with Content-Type: ${contentType}`);
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 3000;
const HOST = 'localhost';

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}/`);
});
