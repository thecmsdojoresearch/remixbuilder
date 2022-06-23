const parse = require('node-html-parser').default;
const render = require("dom-serializer").default;
const fs = require('fs');

const root = parse(fs.readFileSync('./simple.vue').toString());

root.querySelectorAll('*[v-for]').forEach(node => {
  node.removeAttribute('v-for');
});

console.log(root.toString());
