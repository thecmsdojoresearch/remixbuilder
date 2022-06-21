
/////////// Auto Generated Code ///////////
import { useLoaderData } from "@remix-run/react";

export const loader = async (context) => {
  return route.loader(context);
}

export const action = async (context) => {
  return route.action(context);
}
const sha1 = require('sha1');
const fs = require('fs');

const route = {
  async action({ request, params }) {
    const response = await request.json();
    const username = response.username;
    const password = response.password;

    const data = {};

    if (username === 'jim' && password === '123') {
      const cookieSha1 = sha1(request.headers.get('cookie'));
      //now we got the cookie sha1, write to the session
      const token = sha1(username);
      const payload = {
        username,
        token 
      };
      const dataToStore = JSON.stringify(payload);
      await fs.promises.writeFile(`${process.cwd()}/../db/session/${cookieSha1}.json`, dataToStore);
      data.token = token;
    }

    return data;
  }
}

