const fs = require('fs');
const sha1 = require('sha1');

const route = {
  async loader({ request, params }) {
    const data = {};
    const cookie = request.headers.get('cookie');
    if (cookie === null) {
      return {
      };
    }

    const cookieSha1 = sha1(request.headers.get('cookie'));
    const content = await fs.promises.readFile(`${process.cwd()}/../db/session/${cookieSha1}.json`);
    const authentication = JSON.parse(content.toString());
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
