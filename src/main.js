/* Stylesheets */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
import 'bootstrap-material-design/dist/css/ripples.min.css';
import './stylesheets/style.scss';

/* scripts */
import Tree from './bst/Tree';
import 'bootstrap-material-design/dist/js/material.min.js';
import 'bootstrap-material-design/dist/js/ripples.min.js';
$.material.init();

/* declare */
const input = document.getElementById('input-text');
const insertBtn = document.getElementById('insert-btn');
const treeView = document.getElementById('tree-view');
const treeViewContainer = document.getElementById('tree-view-container');
const tree = new Tree(treeView);


/* methods */
const insert = (event) => {
   try {
      event.preventDefault();
      const value = parseInt(input.value);
      if (isNaN(value)) throw 'Try to enter integer again.';
      tree.insert(value);
      input.value = '';
   } catch (errorMsg) {
      alert(errorMsg);
   }

};

const resize = () => {
   treeView.width = treeViewContainer.offsetWidth;
   treeView.height = treeView.width;
   tree.draw(treeView);
};

/* binding */
insertBtn.addEventListener('click', insert);
input.addEventListener('keypress', (event) => {if (event.keyCode === 13) insert(event)});
window.onresize = resize;

/* run methods */
resize();
