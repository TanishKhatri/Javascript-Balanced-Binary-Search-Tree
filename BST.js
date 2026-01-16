function createNode(data) {
  return {
    data,
    left: null,
    right: null,
  }
}

function createTree(arr) {
  let cleanedArr = [...arr];
  cleanedArr = [...new Set(cleanedArr)];
  cleanedArr.sort((a,b) => a-b);

  let root = buildTree(cleanedArr);
  function buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null;
    let mid = Math.floor((start + end)/2);
    let root = createNode(array[mid]);
    root.left = buildTree(array, start, mid-1);
    root.right = buildTree(array, mid + 1, end);

    return root;
  }

  function insert(value) {
    let travelNode = root;
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
  }

  // function deleteItem(value) {
  //   let parentNode = root;
  //   while(true) {

  //   }
  // }

  return {root, insert};
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

const tree = createTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);