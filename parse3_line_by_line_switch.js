const fs = require('fs');
const html = fs.readFileSync('./app/routes/index/template.client.html').toString();

const lines = html.split("\n");

const regexp = /<%.*?%>/;

lines.forEach((line, lineOffset) => {
  if (regexp.exec(line)) {
    lines[lineOffset] = line.replace("<%","").replace("%>","");
    const trimmedLineContent = lines[lineOffset].trim();
    if (trimmedLineContent.substr(0,6) === 'switch') {
      lines[lineOffset] = '{(() => {switch(true){';
    } else if (trimmedLineContent.substr(0,4) === 'case') {
      lines[lineOffset] = lines[lineOffset] + ':' + ' return ( <>'
    } else if (trimmedLineContent.substr(0,7) === 'endcase') {
      lines[lineOffset] = '</>);';
    } else if (trimmedLineContent.substr(0,9) === 'endswitch') {
      lines[lineOffset] = '}})()}';
    }
  }
});

console.log(lines.join("\n"));
