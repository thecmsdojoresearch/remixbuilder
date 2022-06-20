
/////////// Auto Generated Code ///////////
import { useLoaderData } from "@remix-run/react";

export const loader = async (context) => {
  return route.loader(context);
}

export const action = async (context) => {
  return route.action(context);
}
const route = {
  async action({ request, params }) {
    const requestJSON = await request.json();
    const username = requestJSON.username;
    const password = requestJSON.password;
  
    const data = {};

    if (username === 'jim' && password === '123') {
      data.token = '';
    }
    
    return data;
  }
}

