import { useState } from 'react';
import { useEffect } from 'react';

export const initStore = (store) => {
  store.state = state;

  /// initiate getter and setter ////
  const stateKeys = Object.keys(state);

  stateKeys.forEach(keyName => {
    const initValue = store.state[keyName];
    const stateResult = useState(initValue);

    store.state[keyName] = stateResult[0];
    const mutationSetterFunction = stateResult[1];
    const mutationSetterName = `_${keyName}Set`;
    const mutationGetterName = `_${keyName}Get`;
    store[mutationSetterName] = mutationSetterFunction;
    store[mutationGetterName] = (keyName) => {
      return store.state[keyName]; 
    }
  });

  // now initiate set and get
  store.set = (keyName, value) => {
    store[`_${keyName}Set`](value);
  }

  store.get = (keyName) => {
    return store[`_${keyName}Get`]();
  }

  /// initiate onload //////////////
  useEffect( () => {
    if (store.onload !== undefined) {
      store.onload();
    }
  }); 

  return store;
}
