const fs = require('fs');
const { XMLParser, XMLBuilder, XMLValidator} = require('fast-xml-parser');
const { traverse } = require('object-traversal');
const options = {
  ignoreAttributes: false,
  attributeNamePrefix : "",
  commentPropName: "#comment"
};
const parser = new XMLParser(options);
const builder = new XMLBuilder(options);

const html = fs.readFileSync('./app/routes/index/template.client.html');
const tree = parser.parse(html);
console.log(tree);

traverse(tree, (node) => {
  if (node.key == "loop") {
    let tagValue = tree;
    node.meta.nodePath.split('.').slice(0,-1).forEach(tag => {
      tagValue = tagValue[tag];
    });

    tagValue[node.key] = 'jim';
  }
});

const finalHTML = builder.build(tree);

console.log(finalHTML);
