class Route
{
  private config;

  public constructor(config) {
    this.config = config;
  }

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

  /* this can be auto generated */
  public store() {
    const store = new this.config.store;
    store._init();
    return store;
  }

  public template({data, store}) {
    return (
      <div>
        <h1>Version 2</h1>
        <h1>Via Import</h1>
        <h1>This button has been clicked for {store.getCounter()} times in passing store</h1>
        <button onClick={()=> { store.incrementCounter() }}>Click</button>
        <h1>{data.a}</h1>

        <div>
          <h4>Submitted Message: {store.getSubmittedMessage()}</h4>
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
}

////////// The following part can be auto-generated ///////////////
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node"; 
import IndexStore from '../stores/IndexStore';

const route = new Route({
  store: IndexStore
});

export const loader = async () => {
  return route.loader();
}

export const action = async () => {
  return route.action();
}

export default function Index() {
  const store = route.store();
  const data = useLoaderData();
  if (route.template) {
    return route.template({data, store});
  } 
}
