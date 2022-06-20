const route = {
  async loader({ request, params }) {
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

const page = {
  onload() {
    document.title = 'Welcome to the admin panel';
    this.$store.fetchCurrentIP();
  }
}

const store = {
  state: {
    counter: 0,
    ip: '',
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

/////////// Auto Generated Code ///////////
import { useLoaderData } from "@remix-run/react";
import { useEffect } from 'react';
import { initStore } from '../core';

export const loader = (context) => {
  return route.loader(context); 
}

export const action = (context) => {
  return route.action(context); 
}

export default () => {
  const data = useLoaderData();
  initStore(store);
  page.$store = store;
  const state = store.state;

  /// initiate onload //////////////
  useEffect( () => {
    if (page.onload !== undefined) {
      page.onload();
    }
  }); 

  console.log(page.$store);
  return (
    <h1>Current IP: {state.ip}</h1>
  );
}
