const DEFAULT_QUEUE_CAPACITY = 8;

function createNode(data) {
  return {
    data,
    left: null,
    right: null,
  }
}

const queuePrototype = {
  isEmpty() {
    if (this.size === 0) {
      return true;
    } else {
      return false;
    }
  },
  isFull() {
    if (this.size === this.capacity) {
      return true;
    } else {
      return false;
    }
  },
  enqueue(value) {
    if (this.isFull()) {
      this._resize(this.capacity * 2);
    }

    this.arr[this.rear] = value;
    this.rear = (this.rear + 1) % this.capacity;
    this.size++;
  },
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    
    const value = this.arr[this.front];
    this.front = (this.front + 1) % this.capacity;
    this.size--;
    return value;
  },
  peek() {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }

    return this.arr[this.front];
  },
  _resize(newCapacity) {
    let newArr = new Array(newCapacity);

    for (let i = 0; i < this.size; i++) {
      newArr[i] = this.arr[(this.front + i) % this.capacity];
    }

    this.arr = newArr;
    this.capacity = newCapacity;
    this.front = 0;
    this.rear = this.size;
  }
}

function createQueue(capacity = DEFAULT_QUEUE_CAPACITY) {
  const queue =  Object.create(queuePrototype);
  queue.arr = new Array(capacity);
  queue.size = 0;
  queue.front = 0;
  queue.rear = 0;
  queue.capacity = capacity;
  return queue;
}

const treePrototype = {
  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    let mid = Math.floor((start + end)/2);
    let root = createNode(array[mid]);
    root.left = this.buildTree(array, start, mid-1);
    root.right = this.buildTree(array, mid + 1, end);

    return root;
  },
  insertIterative(value) {
    let travelNode = this.root;
    while(true) {
      if (value > travelNode.data) {
        if (travelNode.right !== null) {
          travelNode = travelNode.right;
        } else {
          travelNode.right = createNode(value);
          return true;
        }
      } else if (value < travelNode.data){
        if (travelNode.left !== null) {
          travelNode = travelNode.left;
        } else {
          travelNode.left = createNode(value);
          return true;
        }
      } else {
        return false;
      }
    }
  },
  getSuccessor(node) {
    node = node.right;
    while(node !== null && node.left !== null) {
      node = node.left;
    }
    return node;
  },
  deleteItem(value, rootNode = this.root) {
    //USE rootNode NOT root 
    if (rootNode === null) {
      return rootNode;
    }

    if (rootNode.data > value) {
      rootNode.left = this.deleteItem(value, rootNode.left);
    } else if (rootNode.data < value) {
      rootNode.right = this.deleteItem(value, rootNode.right);
    } else {
      if (rootNode.left === null) {
        return rootNode.right;
      } else if (rootNode.right === null) {
        return rootNode.left;
      } else {
        const successor = this.getSuccessor(rootNode);
        rootNode.data = successor.data;
        rootNode.right = this.deleteItem(successor.data, rootNode.right);
      }
    }

    return rootNode;
  },
  find(value, rootNode = this.root) {
    if (rootNode === null) {
      return null;
    } 

    if (rootNode.data === value) {
      return rootNode;
    }

    if (value > rootNode.data) {
      return this.find(value, rootNode.right);
    } else if (value < rootNode.data) {
      return this.find(value, rootNode.left);
    }

    return null;
  },
  levelOrderForEachIterative(callback) {
    if (typeof callback !== 'function') {
      throw new Error("Provided Callback isn't a function");
    }
    const Q = createQueue();
    Q.enqueue(this.root);

    while (!Q.isEmpty()) {
      const curr = Q.dequeue();
      if (curr !== null) {
        callback(curr);
        Q.enqueue(curr.left);
        Q.enqueue(curr.right);
      }
    }
  },
  levelOrderForEachRecursive(callback) {
    let result = [];
    recursiveLO(this.root, result, 0);
    function recursiveLO(rootNode, result, level) {
      if (rootNode === null) {
        return;
      }

      if (result.length <= level) {
        result.push([]);
      }

      result[level].push(rootNode);
      
      recursiveLO(rootNode.left, result, level + 1);
      recursiveLO(rootNode.right, result, level + 1);
    }

    for (let level of result) {
      level.forEach(item => {
        callback(item);
      });
    }
  },
  preOrderForEach(callback, rootNode = this.root) {
    if (rootNode === null) {
      return;
    }
    callback(rootNode);
    this.preOrderForEach(callback, rootNode.left);
    this.preOrderForEach(callback, rootNode.right);
  },
  inOrderForEach(callback) {
    if (rootNode === null) {
      return;
    }
    this.preOrderForEach(callback, rootNode.left);
    callback(rootNode);
    this.preOrderForEach(callback, rootNode.right);
  },
  postOrderForEach(callback) {
    if (rootNode === null) {
      return;
    }
    this.preOrderForEach(callback, rootNode.left);
    this.preOrderForEach(callback, rootNode.right);
    callback(rootNode);
  }
}

function createTree(arr) {
  const tree = Object.create(treePrototype);
  let cleanedArr = [...arr];
  cleanedArr = [...new Set(cleanedArr)];
  cleanedArr.sort((a,b) => a-b);

  tree.root = tree.buildTree(cleanedArr);
  return tree;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};



const tree = createTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 89, 43, 95, 76, 32, 11]);
tree.deleteItem(76);
prettyPrint(tree.root);
// tree.levelOrderForEachIterative((item) => {console.log(item.data)});
// tree.levelOrderForEachRecursive((item) => {console.log(item.data)});
console.log("\n\n");
tree.preOrderForEach((item) => {console.log(item.data)});