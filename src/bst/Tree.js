import TreeNode from './TreeNode.js';
class Tree {
   constructor(canvas) {
      this._root = null;
      this._canvas = canvas;
      this._settings = {
         sAngle: 0,
         eAngle: 2 * Math.PI,
         lightGreen: '#42f4b9',
         darkGreen: '#0d866c',
         black: '#000',
         ySpace: 20
      }
   }

   clear() {
      this._root = null;
      this.draw(this._canvas);
   }

   del(value) {
      this._root = _delete(this._root, value);
      this.draw(this._canvas);
   }

   draw(canvas, currentValue) {
      canvas.height = canvas.height;
      canvas.width = canvas.width;
      const context = canvas.getContext('2d');
      const startX = ~~(canvas.width / 2);
      const startY = ~~(canvas.width / 20);
      const radius = ~~(canvas.width / 40);
      const xWidth = ~~(canvas.width / 4);
      const {
         sAngle,
         eAngle,
         lightGreen,
         darkGreen,
         black,
         ySpace
      } = this._settings;
      if (this._root !== null) {
         _drawNode(context, startX, startY, radius, sAngle, eAngle, xWidth, 0, ySpace, lightGreen, darkGreen, black, this._root, currentValue);
      }
   }

   insert(value) {
      this._root = _insert(this._root, value);
      this.draw(this._canvas);
   }

   search(value) {
     this.draw(this._canvas, value);
   }
}

//private methods
const _delete = (node, value) => {
   if (node === null) return node;
   else {
      if (value === node.value) {
         if (node.left !== null && node.right !== null) {
            node.left = _detachMaxInLeft(node.left, node);
         } else node = (node.left === null) ? node.right : node.left;
      } else if (value > node.value) node.right = _delete(node.right, value);
      else if (value < node.value) node.left = _delete(node.left, value);
   }
   return node;
}

const _detachMaxInLeft = (node, rootNode) =>{ //find left branch's max and detatch it.
   if (node.right != null) node.right = _detachMaxInLeft(node.right, rootNode);
   else {
      rootNode.value = node.value;
      node = node.left;
   }
   return node;
}

const _insert = (node, value) => {
   if (node === null) node = new TreeNode(value);
   else {
      if (value > node.value) {
         node.right = _insert(node.right, value);
      } else {
         node.left = _insert(node.left, value);
      }
   }
   return node;
}

const _drawNode = (context, startX, startY, radius, sAngle, eAngle, xWidth, depth, ySpace, nodeBackground, borderColor, textColor, node, currentValue) => {
   /* draw node circle */
   context.beginPath();
   context.arc(startX, startY, radius, sAngle, eAngle, false);
   context.fillStyle = nodeBackground;
   context.fill();
   context.lineWidth = 1;
   context.strokeStyle = node.value === currentValue?'red':borderColor;
   context.stroke();
   context.fillStyle = textColor;
   context.font = '12px Arial bold';
   context.fillText(node.value, startX, startY);
   const leaves = Math.pow(2, depth);
   const delta_x = ~~(xWidth / 2);
   /* draw left branch */
   if (node.left !== null) {
      const nextX = startX - delta_x;
      const nextY = startY + 2 * radius + ySpace;
      context.beginPath();
      context.moveTo(startX, startY + radius);
      context.lineTo(nextX, nextY);
      context.lineWidth = 1;
      context.strokeStyle = borderColor;
      context.stroke();
      _drawNode(context, nextX, nextY, radius, sAngle, eAngle, delta_x, depth + 1, ySpace, nodeBackground, borderColor, textColor, node.left,currentValue);
   }
   /* draw right branch */
   if (node.right !== null) {
      const nextX = startX + delta_x;
      const nextY = startY + 2 * radius + ySpace;
      context.beginPath();
      context.moveTo(startX, startY + radius);
      context.lineTo(nextX, nextY);
      context.lineWidth = 1;
      context.strokeStyle = borderColor;
      context.stroke();
      _drawNode(context, nextX, nextY, radius, sAngle, eAngle, delta_x, depth + 1, ySpace, nodeBackground, borderColor, textColor, node.right,currentValue);
   }
}


export default Tree;
