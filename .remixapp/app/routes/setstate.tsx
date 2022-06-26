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
      this.state.counter += 1;
    },
    decrementCounter() {
      this.state.counter -= 1;
    },
    addNumber() {
      this.state.a.b.c.numbers.push(3);
    },
    onMounted() {
      console.log("mounted...");
    },
  }

  ////////////////////// Auto Generated ////////////////
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
          <button onClick={() => {page.incrementCounter(); syncState()}}>Increment Counter</button>
          <button onClick={() => {page.decrementCounter(); syncState()}}>Decrement Counter</button>
          <button onClick={() => {page.addNumber(); syncState()}}>Add Number...</button>
          <Scripts />
        </body>
      </html>
    </>
  );
}
