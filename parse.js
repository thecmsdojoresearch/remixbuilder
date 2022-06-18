const fs = require('fs');
const parse = require('html-dom-parser');
const render = require("dom-serializer").default;

const html = fs.readFileSync('./app/routes/index/template.client.html').toString();

const tree = parse(html);

tree.forEach((node, index) => {
  if (node.name == "button") {
    if (node.attribs['@click'] !== undefined) {
      const expression = node.attribs['@click'];
      delete tree[index].attribs['@click'];
      node.attribs[`onClick={() => {${expression}}}`] = null;
    }
  } else if (node.name == "input") {
    if (node.attribs['@value'] !== undefined) {
      const expression = node.attribs['@value'];
      delete node.attribs['@value'];
      node.attribs[`value={${expression}}`] = null;
    }
    if (node.attribs['@change'] !== undefined) {
      const expression = node.attribs['@change'];
      delete node.attribs['@change'];
      node.attribs[`onChange = {(e) => {${expression}}}`] = null;
    }
  }
});

console.log(render(tree));