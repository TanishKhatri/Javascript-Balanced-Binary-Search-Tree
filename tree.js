import { createTree, prettyPrint } from "./BST.js";

let randomArray = [];
for (let i = 0; i < 4; i++) {
  randomArray.push(Math.floor(Math.random()*100));
}

const tree = createTree(randomArray);
console.log("--Tree Structure--");
prettyPrint(tree.root);
console.log("--Tree Balance Status--");
console.log(tree.isBalanced());
console.log("--Tree In Level Order--");
tree.levelOrderForEachIterative((node) => {console.log(node.data)});
console.log("--Tree In Level Order Recursive--");
tree.levelOrderForEachRecursive((node) => {console.log(node.data)});
console.log("--Tree In PreOrder--");
tree.preOrderForEach((node) => {console.log(node.data)});
console.log("--Tree In InOrder--");
tree.inOrderForEach((node) => {console.log(node.data)});
console.log("--Tree In PostOrder--");
tree.postOrderForEach((node) => {console.log(node.data)});
//Unbalancing the tree
tree.insertIterative(120);
tree.insertIterative(122);
tree.insertIterative(344);
tree.insertIterative(489);
console.log("--Tree Unbalanced--");
prettyPrint(tree.root);
console.log("--Tree Balance Status--");
console.log(tree.isBalanced());
tree.rebalance();
console.log("--Rebalance--");
prettyPrint(tree.root);
console.log("--Tree Balance Status--");
console.log(tree.isBalanced());
console.log("--Tree In Level Order--");
tree.levelOrderForEachIterative((node) => {console.log(node.data)});
console.log("--Tree In Level Order Recursive--");
tree.levelOrderForEachRecursive((node) => {console.log(node.data)});
console.log("--Tree In PreOrder--");
tree.preOrderForEach((node) => {console.log(node.data)});
console.log("--Tree In InOrder--");
tree.inOrderForEach((node) => {console.log(node.data)});
console.log("--Tree In PostOrder--");
tree.postOrderForEach((node) => {console.log(node.data)});