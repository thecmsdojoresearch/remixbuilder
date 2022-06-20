
/////////// Auto Generated Code ///////////
import { useLoaderData } from "@remix-run/react";

export const loader = (context) => {
  return route.loader(context);
}

export const action = (context) => {
  return route.action(context);
}
const route = {
  async loader({ request, params }) {
    const secret = "123456";
    return {
      word: 'me'
    }
  },
  async action({ request, params }) {
    return {
      word: 'post'
    }
  }
}


/**
 * this is the main route component to be presented in the route
 * if this component file is presented, this route will be rendered as a page
 */
const page = {
  login() {
    console.log(store.state.username);
    console.log(store.state.password);
  },
  onload() {
    document.title = 'Welcome to the home page';
    store.fetchCurrentIP();
  }
}

const store = {
  state: {
    username: '',
    password: '',
    counter: 0,
    ip: '',
    number: 3
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
  <div id="form-login">
    <div>
      <label>Username</label>
      <input type="text" value={state.username} onChange={(e)=>{store._usernameSet(e.target.value)}} />
    </div>
    <div>
      <label>Password</label>
      <input type="password" value={state.password} onChange={(e)=>{store._passwordSet(e.target.value)}}/>
    </div>
    <button onClick={()=>{page.login()}}>
      Login
    </button>
  </div>
</div>

  </>
  );
}
