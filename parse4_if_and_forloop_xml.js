const fs = require('fs');
const html = fs.readFileSync('./sample.html').toString();

const { XMLParser, XMLBuilder, XMLValidator} = require('fast-xml-parser');
const { traverse } = require('object-traversal');
const options = {
  ignoreAttributes: false,
  attributeNamePrefix : "",
  commentPropName: "#comment"
};
const parser = new XMLParser(options);
const builder = new XMLBuilder(options);

const convertIfAndFor = function() {
  const lines = html.split("\n");

  const beginToken = '<!--%';
  const endToken = '-->';

  const regexp = new RegExp(`${beginToken}.*?${endToken}`);

  // auto convert swith case and for loop
  lines.forEach((line, lineOffset) => {
    if (regexp.exec(line)) {
      lines[lineOffset] = line.replace(beginToken,'').replace(endToken,'');
      const trimmedLineContent = lines[lineOffset].trim();
      if (trimmedLineContent.substr(0,2) === 'if') {
        lines[lineOffset] = '{(() => {switch(true){' + 'case' + lines[lineOffset].replace('if','') + ':' + ' return ( <>';
      } else if (trimmedLineContent.substr(0,6) === 'elseif') {
        lines[lineOffset] = '</>);' + 'case' + lines[lineOffset].replace('elseif','') + ':' + ' return ( <>'
      } else if (trimmedLineContent.substr(0,4) === 'else') {
        lines[lineOffset] = '</>);' + 'default' + ':' + ' return ( <>'

      } else if (trimmedLineContent.substr(0,5) === 'endif') {
        lines[lineOffset] = '</>);' + '}})()}';
      } else if (trimmedLineContent.substr(0,3) === 'for') {
        lines[lineOffset] = '{(() => { const _ = [];' + "\n" + lines[lineOffset] + '{' + '_.push( <>';
      } else if (trimmedLineContent.substr(0,6) === 'endfor') {
        lines[lineOffset] = '</> )} return _; } )()}';
      }
    }
  });
  return lines.join("\n");
};

//console.log(convertSwitchAndFor(html));
