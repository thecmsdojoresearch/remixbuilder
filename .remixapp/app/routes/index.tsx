
/////////// Auto Generated Code ///////////
import { useLoaderData } from "@remix-run/react";

export const loader = async (context) => {
  return route.loader(context);
}

export const action = async (context) => {
  return route.action(context);
}
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


/**
 * this is the main route component to be presented in the route
 * if this component file is presented, this route will be rendered as a page
 */
import { fetchJSON } from '~/core';

const loginBlock = (
  <h1>Login Block</h1>
);

const page = {
  async login() {
    const result = await fetchJSON('/api/user/login','POST', {
      username: store.state.username,
      password: store.state.password
    });
    if (result.token && result.token.length > 0) {
      window.localStorage.setItem("token", result.token);
      store.set('isLoggedIn', true);
    }
  },
  logout() {
    window.localStorage.removeItem("token");
    store.set('isLoggedIn', false);
  },
  onload() {
    document.title = 'Welcome to the home page';
    if (window.localStorage.getItem("token") !== null) {
      store.set('isLoggedIn', true);
    } else {
      store.set('isLoggedIn', false);
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
    isLoggedIn: false,
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
{(() => {switch(true){case   state.isLoggedIn === true : return ( <>
  <p>Logged in</p>
  <button onClick={()=>{page.logout()}}>Log Out</button>
</>);default: return ( <>
  <div id="form-login">
    <div>
      <label>Your Username...</label>
      <input type="text" value={state.username} onChange={(e)=>{store.set('username', e.target.value)}} />
    </div>
    <div>
      <label>Your Password...</label>
      <input type="password" value={state.password} onChange={(e)=>{store.set('password', e.target.value)}}/>
    </div>
    <button onClick={()=>{page.login()}}>
      Login
    </button>
  </div>
</>);}})()}
</div>

  </>
  );
}
