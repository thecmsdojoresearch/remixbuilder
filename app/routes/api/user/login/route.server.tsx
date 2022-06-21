const sha1 = require('sha1');
const fs = require('fs');

const route = {
  async action({ request, params }) {
    const response = await request.json();
    const username = response.username;
    const password = response.password;

    const data = {};

    if (username === 'jim' && password === '123') {
      const token = sha1(username);
      const payload = {
      };
      payload[token] = {
        username,
        token 
      };
      const dataToStore = JSON.stringify(payload);
      await fs.promises.writeFile(`${process.cwd()}/../db/session.json`, dataToStore);
      data.token = token;
    }

    return data;
  }
}
