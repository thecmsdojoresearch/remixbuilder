const parse = require('node-html-parser').default;
const render = require("dom-serializer").default;
const fs = require('fs');
const { JSDOM } = require("jsdom");

const html = fs.readFileSync('./simple.vue').toString();

const { document } = new JSDOM(html).window;

const root = parse(html);
root
.querySelector('template')
.querySelectorAll('*[v-for]')
.forEach(node => {
  node.insertAdjacentHTML('beforebegin',`<%for(${node._attrs['v-for']})%>\n`);
  node.insertAdjacentHTML('afterend',"\n<%endfor%>");
  node.removeAttribute('v-for');
});

//console.log(root.toString());
const serverScriptNode = root
.querySelector("script[from='server']")

console.log(serverScriptNode.innerHTML);
