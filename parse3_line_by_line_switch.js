const fs = require('fs');
const html = fs.readFileSync('./app/routes/index/template.client.html').toString();

const convertSwitchAndFor = (html) => {
  const lines = html.split("\n");

  const regexp = /<%.*?%>/;

  // auto convert swith case and for loop
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
      } else if (trimmedLineContent.substr(0,3) === 'for') {
        lines[lineOffset] = '{(() => { let _ = [];' + "\n" + lines[lineOffset] + '{' + '_.push( <>';
      } else if (trimmedLineContent.substr(0,6) === 'endfor') {
        lines[lineOffset] = '</> )} return _; } )()}';
      }
    }
  });
  return lines.join("\n");
};
