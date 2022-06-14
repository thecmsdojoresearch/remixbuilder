

class Route
{
  public async loader() {
    return {
      a: 12
    };
  }

  public async action() {
    return {
      a: 12
    };
  }

  public template() {
  }
}

import { useState } from 'react';

class BaseStore
{
  public state = {};

  protected init() {
    const stateKeys = Object.keys(this.state);

    stateKeys.forEach(keyName => {
      const initValue = this.state[keyName];
      const stateResult = useState(initValue);

      this.state[keyName] = stateResult[0];
      const mutationSetterFunction = stateResult[1];
      const mutationSetterName = "set" + keyName.charAt(0).toUpperCase() + keyName.slice(1);
      const mutationGetterName = "get" + keyName.charAt(0).toUpperCase() + keyName.slice(1);
      this[mutationSetterName] = mutationSetterFunction;
      this[mutationGetterName] = () => {
        return this.state[keyName]; 
      }
    });
  }
}

class Store extends BaseStore
{
  public state = {
    counter: 0
  }

  public constructor() {
    super();
    this.init();
    console.log()
  }

  public incrementCounter() {
    this.setCounter(this.state.counter + 1);
  }
}

export default function Index() {
  const store = new Store();

  const template = (
    <div>
      <h1>Button has been clicked for {store.getCounter()} times</h1>
      <button onClick={()=> { store.incrementCounter() }}>Click</button>
    </div>
  );

  return template;
}
