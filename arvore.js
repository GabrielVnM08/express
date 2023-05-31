const fs = require('fs');
const readline = require('readline');

class TreeNode {
  constructor(keyword) {
    this.keyword = keyword;
    this.urls = [];
    this.left = null;
    this.right = null;
  }
}

class SearchTree {
  constructor() {
    this.root = null;
  }

  insert(keyword, url) {
    if (!this.root) {
      this.root = new TreeNode(keyword);
      this.root.urls.push(url);
      return;
    }

    let currentNode = this.root;
    while (true) {
      if (keyword === currentNode.keyword) {
        currentNode.urls.push(url);
        return;
      } else if (keyword < currentNode.keyword) {
        if (!currentNode.left) {
          currentNode.left = new TreeNode(keyword);
          currentNode.left.urls.push(url);
          return;
        }
        currentNode = currentNode.left;
      } else {
        if (!currentNode.right) {
          currentNode.right = new TreeNode(keyword);
          currentNode.right.urls.push(url);
          return;
        }
        currentNode = currentNode.right;
      }
    }
  }

  search(keyword) {
    let currentNode = this.root;
    while (currentNode) {
      if (keyword === currentNode.keyword) {
        return currentNode.urls;
      } else if (keyword < currentNode.keyword) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return null;
  }

  saveToFile(filePath) {
    const data = JSON.stringify(this.root);
    fs.writeFileSync(filePath, data);
  }

  loadFromFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    this.root = JSON.parse(data);
  }
}

// Cria uma interface de leitura de linha
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função para realizar a busca
function performSearch(keyword) {
  const results = searchTree.search(keyword);
  if (results) {
    console.log(`Resultados para "${keyword}":`);
    console.log(results);
  } else {
    console.log(`Nenhum resultado encontrado para "${keyword}".`);
  }
  rl.close();
}

// Exemplo de uso

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

// Salvando os dados no arquivo JSON
searchTree.saveToFile('search_tree.json');

// Carregando os dados do arquivo JSON
searchTree.loadFromFile('search_tree.json');

// Solicitar palavra-chave para busca
rl.question('Digite a palavra-chave para buscar: ', (keyword) => {
  performSearch(keyword);

});

module.exports = arvore.js;