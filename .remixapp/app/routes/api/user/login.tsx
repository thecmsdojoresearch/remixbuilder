
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

import DB from '~/core/fsdb';

async function authenticate(request){
  let result = {};
  const requestPayload = await request.json();
  const incomingUsername = requestPayload.username.trim();
  const incomingPassword = requestPayload.password.trim();

  const db = new DB();
  const cookieSha1 = sha1(request.headers.get('cookie'));
  const sessionInfo = await db.get(`session/${cookieSha1}`);
  
  const userData = await db.get(`user/${incomingUsername}`);

  if (userData.username && userData.passhash && userData.passhash === sha1(incomingPassword)) {
    result.token = sessionInfo.token;
  }
  
  return result;
}

const route = {
  async action({ request, params }) {
    const result = await authenticate(request);
    return result;
  }
}

