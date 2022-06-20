const fs = require('fs');
const html = fs.readFileSync('./app/routes/index/template.client.html').toString();

const regexp = /<%.*?%>/gs;

console.log(html.match(regexp));
