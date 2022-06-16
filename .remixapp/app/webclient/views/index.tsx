import IndexStore from '../stores/IndexStore'; //auto generated
import { useLoaderData } from "@remix-run/react";

export default () => {
  const store = new IndexStore; //auto generated
  store._init(); //auto generated

  const data = useLoaderData(); //auto generated

  return (
    <div>
      <h1>Version 4</h1>
      <h1>Via Import</h1>
      <h1>This button has been clicked for {store.getCounter()} times in passing store</h1>
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
    </div>
  );
}
