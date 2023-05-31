
import { searchTree } from './arvore.js';
const express = require('express');
const http = require('http');
const app = express();
const host = '127.0.0.1';
const port = 8080;
const fs = require('fs');


    const filePath = 'index.html'; // Atualize o caminho para o arquivo HTML
    const html = fs.readFileSync(filePath, 'utf8'); 

app.get('/', function (req, res) {
    res.writeHead(200);
    res.end(html); 
    
});

const server = http.createServer(app);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);

});

module.exports = html;
