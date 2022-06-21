
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
      export default ()=> {
        /// initiate onload //////////////
        useEffect( () => {
          if (page.onload !== undefined) {
            page.onload();
          }
        });
        return <></>
      }