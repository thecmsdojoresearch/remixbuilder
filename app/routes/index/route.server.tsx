import fs = require('fs');

const route = {
  async loader({ request, params }) {
    const data = {};

    const content = await fs.promises.readFile(`${process.cwd()}/../db/authentication.json`);
    const authentication = JSON.parse(content.toString());
    if (authentication.username === 'jim' && authentication.token.length > 0) {
      data.token = authentication.token;
      console.log(data);
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
