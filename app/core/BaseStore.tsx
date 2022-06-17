/**
 * with the BaseStore, we abstract out useState and useEffect
 */
import { useState } from 'react';
import { useEffect } from 'react';
const axios = require('axios');

export default class BaseStore
{
  private state = {};

  public _init() {
    /// initialize getter and setter ////
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

    /// initiate onload //////////////
    useEffect( () => {
      this.onload();
    }); 

    return this;
  }

  public async fetchJSON(url: string, method: string = 'GET', data: object = {}) {
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
