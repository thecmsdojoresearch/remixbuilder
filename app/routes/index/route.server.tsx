const fs = require('fs');
const sha1 = require('sha1');

const route = {
  async loader({ request, params }) {
    const data = {};

    const content = await fs.promises.readFile(`${process.cwd()}/../db/session.json`);
    const authentication = JSON.parse(content.toString());
    console.log(authentication);
    const token = sha1('jim');
    if (authentication[token] !== undefined) {
      data.token = token;
    }
    return data; 
  },
  async action({ request, params }) {
    console.log(request.json());
    return {
      word: 'post'
    }
  }
}
