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
      tree[index].attribs[`onClick={() => {${expression}}`] = null;
    }
  }
})

console.log(render(tree));
