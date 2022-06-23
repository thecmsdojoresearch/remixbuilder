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

  const jim = (props) => {
    console.log(props);
    return <h1>jim</h1>
  }

  components['if'] = (props) => {
    if (props.condition === true) {
      return props.children;
    } else {
      return <h1>not true if</h1>
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

  components['private'] = () => (
    <>
      <h1>test...</h1>
      <components.if condition = {true} >
        <components.random />
        <h1>private portal</h1>
      </components.if>
    </>
  )

  return components[key]();
}
