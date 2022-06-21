
/////////// Auto Generated Code ///////////
import { useLoaderData } from "@remix-run/react";

export const loader = async (context) => {
  return route.loader(context);
}

export const action = async (context) => {
  return route.action(context);
}


    const route = {
      async loader() {
        return {}
      },
      async action() {
        return {}
      }
    }
    

import { fetchJSON } from '~/core';

const page = {
  onload() {
    document.title = 'Welcome to the home page';
    if (window.localStorage.getItem("token") !== null) {
      window.location.href='/portal';
    }
  }
}

const store = {state:{}}


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

  </>
  );
}
