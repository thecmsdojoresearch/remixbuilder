const fs = require('fs');
const html = fs.readFileSync('./source.html').toString();
const { XMLParser, XMLBuilder } = require('fast-xml-parser');
const { traverse } = require('object-traversal');

const options = {
  ignoreAttributes: false,
  preserveOrder: false,
  commentPropName: "#comment",
};

const parser = new XMLParser(options);
const builder = new XMLBuilder(options);

const tree = parser.parse(html);
traverse(tree, ({ parent, key, value, meta }) => {
  if (key === '@_@if') {
    parent['#comment'] = '%if'
  }
});

console.log(builder.build(tree).replace('><',"><\n"));
