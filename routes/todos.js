const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todos");
const { ensureAuth } = require("../middleware/auth");

router.get("/", ensureAuth, todosController.getTodos);

router.post("/createTodo", todosController.createTodo);

router.put("/markComplete", todosController.markComplete);

router.put("/markIncomplete", todosController.markIncomplete);

router.delete("/deleteTodo", todosController.deleteTodo);

module.exports = router;

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor(value) {
    this.root = new Node(value);
    this.count = 1;
  }

  size() {
    return this.count;
  }

  insert(value) {
    this.count++;

    let newNode = new Node(value);

    const searchTree = (node) => {
      // if value < node.value, go left
      if (value < node.value) {
        // if no left child, append new node
        if (!node.left) {
          node.left = newNode;
          // if left child, look left again
        } else {
          searchTree(node.left);
        }
      }
      // if value > node.value, go right
      else if (value > node.value) {
        // if no right child, append new node
        if (!node.right) {
          node.right = newNode;
          // if right child look again
        } else {
          searchTree(node.right);
        }
      }
    };
    searchTree(this.root);
  }

  min() {
    let currentNode = this.root;

    // continue looping left until no more children
    while (currentNode.left) {
      currentNode = currentNode.left;
    }

    return currentNode.value;
  }

  max() {
    let currentNode = this.root;

    // continue looping right until no more children
    while (currentNode.right) {
      currentNode = currentNode.right;
    }

    return currentNode.value;
  }

  contains(value) {
    let currentNode = this.root;

    while (currentNode) {
      if (value === currentNode.value) {
        return true;
      }
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return false;
  }

  // depth first search - branch by branch

  // in-order
  //left, root, right
  // 2, 3, 12, 15, 28, 36, 39
  dfsInOrder() {
    let result = [];

    const traverse = (node) => {
      // if left child exist, go left again
      if (node.left) traverse(node.left);
      //capture root node value
      result.push(node.value);
      // if right child exist, go right again
      if (node.right) traverse(node.right);
    };

    return result;
  }
  //pre-order
  //root, left, right
  // 15, 3, 2, 12, 36, 28, 39
  dfsPreOrder() {
    let result = [];

    const traverse = (node) => {
      //capture root node value
      result.push(node.value);
      // if left child exist, go left again
      if (node.left) traverse(node.left);
      // if right child exist, go right again
      if (node.right) traverse(node.right);
    };

    return result;
  }

  //post-order
  //left, right, root
  // 2, 12, 3, 28, 39, 36,15
  dfsPostOrder() {
    let result = [];

    const traverse = (node) => {
      // if left child exist, go left again
      if (node.left) traverse(node.left);
      // if right child exist, go right again
      if (node.right) traverse(node.right);
      //capture root node value
      result.push(node.value);
    };

    return result;
  }

  //breadth first search - level by level
  // use a queue
  //
  bfs() {
    let result = [];
    let queue = [];

    queue.push(this.root);

    while (queue.length) {
      let currentNode = queue.shift();

      result.push(currentNode);

      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
      return result;
    }
  }
}
