import { useState, useEffect } from 'react';
import {
  Scripts,
} from "@remix-run/react";

export default () => {
  let state = {
    counter: 0
  }

  let [$state, setState] = useState(state);

  const syncState = () => {
    setState({...$state}); //need to set state
  }

  const page = {
    incrementCounter(){
      $state.counter ++;
    }
  }

  useEffect(() => {
    syncState();
  }, [$state]); //we must provide the state dependency to prevent the infinite mutation loop!!!

  return (
    <>
      <html>
        <head>
        </head>
        <body>
          <h1>{$state.counter}</h1>
          <button onClick={page.incrementCounter}>Click</button>
          <Scripts />
        </body>
      </html>
    </>
  );
}
