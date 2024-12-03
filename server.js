const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;

    // Map URL paths to file paths
    const urlMapping = {
        '/': '/index.html',
        '/index': '/index.html',
        '/introduction': '/introduction.html'
    };

    // Check if the URL path exists in the mapping
    if (urlMapping[req.url]) {
        filePath = '.' + urlMapping[req.url];
    }

    filePath = path.resolve(filePath);

    // Determine the content type based on file extension
    const contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png'
    };

    const extname = path.extname(filePath);
    const contentTypeHeader = contentType[extname] || 'text/plain';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end("File not found!");
            return;
        }

        res.writeHead(200, { 'Content-Type': contentTypeHeader });
        res.end(data);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});