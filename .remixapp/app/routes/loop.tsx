import {
  Scripts,
} from "@remix-run/react";

import { useState } from 'react';

export default () => {
  const numbers = [1, 3, 5, 7];
  const key = 'public';
  const components = {};
  let [counter, counterSet] = useState(0);
  const page = {
    incrementCounter() {
      counter ++;
      counterSet(counter);
    }
  }

  const Jim = (props) => {
    return <h2>jim</h2>
  }

  components['if'] = (props) => {
    if (props.condition) {
      return props.children;
    } else {
      return <></>
    }
  }

  components['random'] = () => (<h1>random</h1>)

  components['public'] = () => (
    <>
      <html>
        <head>
        </head>
        <body>
          <div 
            style={{
              background: "lightYellow", 
              border: "1px silver solid",
              width:"200px"
            }}>
            {numbers.map(number => <h1 key={number}>***{number}</h1>)}
          </div>
          <div>
            <div>...{counter}</div>
            <button 
              onClick={page.incrementCounter}>
              Click
            </button>
          </div>
          <Scripts />
        </body>
      </html>
    </>
  )

  components['private'] = () => (
    <>
      <Jim></Jim>
      <h1>test...</h1>
      <components.random />
      <h1>private portal</h1>
    </>
  )

  return components[key]();
}
