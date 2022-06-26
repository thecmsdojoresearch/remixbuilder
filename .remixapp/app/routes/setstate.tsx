import { useState, useEffect } from 'react';
import {
  Scripts,
} from "@remix-run/react";

export default () => {
  const page = {
    state: {
      counter: 0,
      a: {
        b: {
          c: {
            numbers: []
          }
        }
      }
    },
    incrementCounter(){
      this.state.counter += 2;
    },
    addNumber() {
      this.state.a.b.c.numbers.push(3);
    },
    onMounted() {
      console.log("mounted...");
    }
  }

  let [state, setState] = useState(page.state);

  page.state = state;

  const syncState = () => {
    setState({...state}); //need to set state
  }

  return (
    <>
      <html>
        <head>
        </head>
        <body>
          <h1>{page.state.counter}......</h1>
          <h4>{page.state.a.b.c.numbers}</h4>
          <button onClick={() => {page.incrementCounter();syncState()}}>Click</button>
          <button onClick={() => {page.addNumber(); syncState()}}>Add Number...</button>
          <Scripts />
        </body>
      </html>
    </>
  );
}
