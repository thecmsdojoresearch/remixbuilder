import { useState, useEffect } from 'react';
import {
  Scripts,
} from "@remix-run/react";

export default function Page() {
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
    action: {
      incrementCounter(){
        state.counter ++;
      },
      addNumber() {
        state.a.b.c.numbers.push(1);
      },
    },
    onMounted() {
      console.log("mounted...");
    }
  }

  let [state, setState] = useState(page.state);

  const syncState = () => {
    setState({...state}); //need to set state
  }

  const action = page.action;

  return (
    <>
      <html>
        <head>
        </head>
        <body>
          <h1>{state.counter}</h1>
          <h1>{state.a.b.c.numbers}</h1>
          <button onClick={() => {action.incrementCounter();syncState()}}>Click</button>
          <button onClick={() => {action.addNumber(); syncState()}}>Add Number...</button>
          <Scripts />
        </body>
      </html>
    </>
  );
}
