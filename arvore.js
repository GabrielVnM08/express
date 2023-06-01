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
        if (!currentNode.urls.includes(url)) {
          currentNode.urls.push(url);
        }
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

  toJson() {
    const treeData = this.traverseTree(this.root);
    return JSON.stringify(treeData);
  }

  traverseTree(node) {
    if (!node) {
      return null;
    }

    const treeData = {
      keyword: node.keyword,
      urls: node.urls,
      left: this.traverseTree(node.left),
      right: this.traverseTree(node.right),
    };

    return treeData;
  }
}

module.exports = {
  SearchTree: SearchTree
};
