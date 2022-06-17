/**
 * with the BaseStore, we abstract out useState and useEffect
 */
import { useState } from 'react';
import { useEffect } from 'react';

export default class BaseStore
{
  public state = {};

  protected _init() {
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
  }

  public async fetchJSON(url: string) {
    const result = await fetch(url);
    const jsonData = await result.json();
    return jsonData;
  }

  public onload() {
  }
}
