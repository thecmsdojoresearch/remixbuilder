const parse = require('node-html-parser').default;
const render = require("dom-serializer").default;
const fs = require('fs');
const { JSDOM } = require("jsdom");

const html = fs.readFileSync('./simple.vue').toString();

const { document } = new JSDOM(html).window;

const root = parse(html);
root.querySelectorAll('*[v-for]').forEach(node => {
  console.log(node._attrs['v-for']);
  console.log(`<!--%for(${node._attrs['v-for']})-->`);
  node.insertAdjacentHTML('beforebegin',`<%for(${node._attrs['v-for']})%>\n`);
  node.insertAdjacentHTML('afterend',"\n<%endfor%>");
  node.removeAttribute('v-for');
});

console.log(root.toString());
