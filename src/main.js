/* Stylesheets */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
import 'bootstrap-material-design/dist/css/ripples.min.css';
import './stylesheets/style.scss';

/* scripts */
import Tree from './bst/Tree.js';
import 'bootstrap-material-design/dist/js/material.min.js';
import 'bootstrap-material-design/dist/js/ripples.min.js';
$.material.init();

/* declare */
const deleteBtn = document.getElementById('delete-btn');
const input = document.getElementById('input-text');
const insertBtn = document.getElementById('insert-btn');
const treeView = document.getElementById('tree-view');
const treeViewContainer = document.getElementById('tree-view-container');
const tree = new Tree(treeView);


/* methods */
const del = (event) => {
   try {
      event.preventDefault();
      const value = parseInt(input.value);
      if (isNaN(value)) throw 'Try to enter integer again.';
      tree.del(value);
      input.value = '';
      input.focus();
   } catch (errorMsg) {
      alert(errorMsg);
      input.value = '';
   }
}

const insert = (event) => {
   try {
      event.preventDefault();
      const value = parseInt(input.value);
      if (isNaN(value)) throw 'Try to enter integer again.';
      tree.insert(value);
      input.value = '';
      input.focus();
   } catch (errorMsg) {
      alert(errorMsg);
      input.value = '';
   }
};

const resize = () => {
   treeView.width = treeViewContainer.offsetWidth;
   treeView.height = treeView.width;
   tree.draw(treeView);
};

/* binding */
deleteBtn.addEventListener('click', del);
insertBtn.addEventListener('click', insert);
input.addEventListener('keypress', (event) => {
   if (event.keyCode === 13) insert(event)
});
input.focus();
window.onresize = resize;

/* run methods */
resize();
