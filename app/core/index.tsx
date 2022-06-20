import { useState } from 'react';
import { useEffect } from 'react';

export const initStore = (store) => {
  /// initiate getter and setter ////
  const stateKeys = Object.keys(store.state);

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

export const fetchJSON = async (url: string, method: string = 'GET', data: object = {}) => {
  const axios = require('axios');
  const payload = {
    method,
    url
  };

  if (method != 'GET') {
    payload.data = data;
  }

  const jsonData = await axios(payload);
  return jsonData.data;
}
