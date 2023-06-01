const { SearchTree } = require('./arvore.js');
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const host = '127.0.0.1';
const port = 8080;

const searchTree = new SearchTree();

// Inserindo dados de exemplo
searchTree.insert('encyclopedia', 'https://www.wikipedia.org/');
searchTree.insert('knowledge', 'https://www.wikipedia.org/');
searchTree.insert('reference', 'https://www.wikipedia.org/');

searchTree.insert('news', 'https://www.nytimes.com/');
searchTree.insert('journalism', 'https://www.nytimes.com/');
searchTree.insert('current events', 'https://www.nytimes.com/');

searchTree.insert('shopping', 'https://www.amazon.com/');
searchTree.insert('e-commerce', 'https://www.amazon.com/');
searchTree.insert('products', 'https://www.amazon.com/');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/search', function (req, res) {
  const keyword = req.query.keyword;
  const urls = searchTree.search(keyword) || [];
  res.json(urls);
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
