/**
 * with the BaseStore, we abstract out useState and useEffect
 */
import { useState } from 'react';
import { useEffect } from 'react';

export default class Store
{
  protected storeDefinition = {};

  public constructor(storeDefinition) {
    this.state = state;

    /// initiate getter and setter ////
    const stateKeys = Object.keys(this.state);

    stateKeys.forEach(keyName => {
      const initValue = this.state[keyName];
      const stateResult = useState(initValue);

      this.state[keyName] = stateResult[0];
      const mutationSetterFunction = stateResult[1];
      const mutationSetterName = `_${keyName}Set`;
      const mutationGetterName = `_${keyName}Get`;
      this[mutationSetterName] = mutationSetterFunction;
      this[mutationGetterName] = (keyName) => {
        return this.state[keyName]; 
      }
    });

    // now initiate set and get
    this.set = (keyName, value) {
      this[`_${keyName}Set`](value);
    }

    this.get = (keyName) {
      return this[`_${keyName}Get`]();
    }

    /// initiate onload //////////////
    useEffect( () => {
      this.onload();
    }); 

    return this;
  }

  public async fetchJSON(url: string, method: string = 'GET', data: object = {}) {
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

  public onload() {
  }
}
