import { useState } from 'react';

export default class BaseStore
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
