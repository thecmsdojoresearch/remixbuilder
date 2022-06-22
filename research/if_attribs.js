const fs = require('fs');
const html = fs.readFileSync('./source.html').toString();
const { XMLParser, XMLBuilder } = require('fast-xml-parser');
const { traverse } = require('object-traversal');

const parser = new XMLParser({
  ignoreAttributes: false,
});
const builder = new XMLBuilder({
  ignoreAttributes: false,
});

const tree = parser.parse(html);
traverse(tree, ({ parent, key, value, meta }) => {
  if (key === '@_@if') {
    console.log(parent);
    delete parent[key];
  }
});

console.log(builder.build(tree));
