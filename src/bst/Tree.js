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

   draw(canvas) {
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
         _drawNode(context, startX, startY, radius, sAngle, eAngle, xWidth, 0,ySpace, lightGreen, darkGreen, black, this._root);
      }
   }

   insert(value) {
      this._root = _insert(this._root, value);
      this.draw(this._canvas);
   }
}

//private methods
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

const _drawNode = (context, startX, startY, radius, sAngle, eAngle, xWidth, depth, ySpace,nodeBackground, borderColor, textColor, node) => {
   /* draw node circle */
   context.beginPath();
   context.arc(startX, startY, radius, sAngle, eAngle, false);
   context.fillStyle = nodeBackground;
   context.fill();
   context.lineWidth = 1;
   context.strokeStyle = borderColor;
   context.stroke();
   context.fillStyle = textColor;
   context.font = '12px Arial bold';
   context.fillText(node.value, startX, startY);
   const leaves = Math.pow(2, depth);

   const delta_x = ~~(xWidth / 2);
   console.log(startX);
   console.log(delta_x)
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
      _drawNode(context, nextX, nextY, radius, sAngle, eAngle, delta_x, depth + 1,ySpace, nodeBackground, borderColor, textColor, node.left);
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
      _drawNode(context, nextX, nextY, radius, sAngle, eAngle, delta_x, depth + 1,ySpace, nodeBackground, borderColor, textColor, node.right);
   }
}


export default Tree;