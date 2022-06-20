
/////////// Auto Generated Code ///////////
import { useLoaderData } from "@remix-run/react";

export const loader = async (context) => {
  return route.loader(context);
}

export const action = async (context) => {
  return route.action(context);
}
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


/**
 * this is the main route component to be presented in the route
 * if this component file is presented, this route will be rendered as a page
 */
import { fetchJSON } from '~/core';

const page = {
  async login() {
    const result = await fetchJSON('/api/user/login','POST', {
      username: store.state.username,
      password: store.state.password
    });
    if (result.token && result.token.length > 0) {
      window.localStorage.setItem("token", result.token);
    }
  },
  isLoggedIn() {
    let result = false;
    const token = window.localStorage.getItem('token');
    if (token !== null && token.length > 0) {
      console.log('logged in');
      result = true;
    }
    return result;
  },
  onload() {
    document.title = 'Welcome to the home page';
    if (this.isLoggedIn()) {
      store.set('isLogin', true);
    }
  }
}

const store = {
  state: {
    username: '',
    password: '',
    counter: 0,
    ip: '',
    number: 3,
    isLogin: false,
  },
  incrementCounter() {
    this.set('counter', this.state.counter + 1);
  },
  decrementCounter() {
    this.set('counter', this.state.counter - 1);
  },
  fetchCurrentIP() {
    this.set('ip','127.0.0.1');
  }
}


import { useEffect } from 'react';
import { initStore } from '~/core';

export default () => {
  const data = useLoaderData();
  initStore(store);

  const state = store.state;

  /// initiate onload //////////////
  useEffect( () => {
    if (page.onload !== undefined) {
      page.onload();
    }
  });

  return (
  <>
    <div>
{(() => {switch(true){case   (data.token.length > 0): return ( <>
  <div id="">
    <h1>You are logged in</h1>
  </div>
</>);default: return ( <>
  <div id="form-login">
    <div>
      <label>Your Username</label>
      <input type="text" value={state.username} onChange={(e)=>{store.set('username', e.target.value)}} />
    </div>
    <div>
      <label>Your Password</label>
      <input type="password" value={state.password} onChange={(e)=>{store.set('password', e.target.value)}}/>
    </div>
    <button onClick={()=>{page.login()}}>
      Login
    </button>
  </div>
  <div></div>
</>);}})()}
</div>

  </>
  );
}
