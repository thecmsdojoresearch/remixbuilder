const fs = require('fs');
const html = fs.readFileSync('./app/routes/index/template.client.html').toString();

const lines = html.split("\n");

const regexp = /<%.*?%>/;

const matches = [];
lines.forEach((line, lineOffset) => {
  if (regexp.exec(line)) {
    const lineContent = line;
    matches.push({
      lineContent, lineOffset
    });
  }
});

console.log(matches);
