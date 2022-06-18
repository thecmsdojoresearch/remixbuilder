const fs = require('fs');
const { XMLParser, XMLBuilder } = require('fast-xml-parser');
const { traverse } = require('object-traversal');
const parser = new XMLParser({
  ignoreAttributes: false
});
const builder = new XMLBuilder();

const html = fs.readFileSync('./app/routes/index/template.client.html').toString();

const regex = new RegExp(/<!--%.*?-->/gs, 'g');
console.log(html.match(regex));

//const tree = parser.parse(html);


process.exit(1);
tree['%'] = {'#text':'additional text'};

console.log(builder.build(tree));

tree.forEach((node, index) => {
  if (node.type == "tag") {
    if (node.attribs['@if'] !== undefined) {
      const expression = node.attribs['@click'];
      console.log(node);
    }

    if (node.name == "button") {
      //@click directive
      if (node.attribs['@click'] !== undefined) {
        const expression = node.attribs['@click'];
        delete tree[index].attribs['@click'];
        node.attribs[`onClick={() => {${expression}}}`] = null;
      }
    } else if (node.name == "input") {
      //@value directive
      if (node.attribs['@value'] !== undefined) {
        const expression = node.attribs['@value'];
        delete node.attribs['@value'];
        node.attribs[`value={${expression}}`] = null;
      }
      //@change directive
      if (node.attribs['@change'] !== undefined) {
        const expression = node.attribs['@change'];
        delete node.attribs['@change'];
        node.attribs[`onChange = {(e) => {${expression}}}`] = null;
      }
    }
  }
});

console.log(render(tree));
