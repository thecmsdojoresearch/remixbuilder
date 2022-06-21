
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

class DB
{ 
  private path = "../db";

  public async get(key) {
    console.log(key);
    const keyPath = key.replace(".","/");
    const keyFile = `${process.cwd()}/${this.path}/${keyPath}.json`;
    let result = {};
    result = await fs.promises.readFile(keyFile);
    result = JSON.parse(result.toString());
    return result;
  }

  public async set(key:string, value:object) {
    const valueJSON = JSON.stringify(value);
    const keyPath = key.replace(".","/");
    await fs.promises.writeFile(`${process.cwd()}/${this.path}/${keyPath}.json`, valueJSON);
  }
}

async function authenticate(request){
  let result = {};
  const requestPayload = await request.json();
  const incomingUsername = requestPayload.username.trim();
  const incomingPassword = requestPayload.password.trim();

  const cookieSha1 = sha1(request.headers.get('cookie'));

  const db = new DB();
  const userData = await db.get(`user/${incomingUsername}`);

  if (userData.username && userData.passhash && userData.passhash === sha1(incomingPassword)) {
    const sessionInfo = await db.get(`session/${cookieSha1}`);
    result.token = sessionInfo.token;
  }

  console.log(result);

  return result;
}

const route = {
  async action({ request, params }) {
    const result = await authenticate(request);
    return result;
  }
}

