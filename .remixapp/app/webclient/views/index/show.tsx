import IndexStore from '../../stores/index'; //auto generated
import { useLoaderData } from "@remix-run/react";
import { useEffect } from 'react';

export default () => {
  const data = useLoaderData();
  const store = new IndexStore; 
  store._init(); 

  useEffect(() => {
    store.fetchCurrentIP();
  });

  return (
    <div>
      <h1>Version 8</h1>
      <h1>Via Import</h1>
      <h1>This button has been clicked for {store.getCounter()} times in passing store</h1>
      <h4>Current IP Address: {store.getIp()} </h4>
      <button onClick={()=> { store.incrementCounter() }}>Click</button>
      <h1>{data.a}</h1>

      <div>
        {(() => {
          if (store.getSubmittedMessage().length > 0) {
            return <h4>Submitted Message: {store.getSubmittedMessage()}</h4> 
          }
        })()}
        <label>Add Message</label>
        <input type = "text" 
          value = {store.getMessage()} 
          onChange = {(e) => {store.setMessage(e.target.value) }}
        />
        <button onClick={ ()=> {store.submitMessage()} }>Submit Message</button>
      </div>
      <button onClick={()=> { store.fetchWeatherForcast() }}>Check Weather Forcast</button>
      <div>
        {JSON.stringify(store.getWeatherInfo())}
      </div>
    </div>
  );
}
