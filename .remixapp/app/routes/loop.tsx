import {
  Scripts,
} from "@remix-run/react";

import { useState } from 'react';

export default () => {
  const numbers = [1, 3, 5, 7];
  const key = 'private';
  const components = {};
  let [counter, counter$] = useState(0);
  const page = {
    incrementCounter() {
      counter$(counter + 4);
    }
  }

  components['public'] = (
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
            <div>{counter}</div>
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

  components['private'] = (
    <>
      <h1>private portal</h1>
    </>
  )

  return components[key];
}
