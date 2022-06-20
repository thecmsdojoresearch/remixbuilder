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
  const comments = [];
  if (typeof node.comment === 'object') {
    comments = node.comment;
  } else if (typeof node.comment === 'string') {
    comments.push(node.comment);
  }

  comments.forEach(comment => {
  });
});

const finalHTML = builder.build(tree);

console.log(finalHTML);
