class Route extends CoreRoute
{
  private type = "page"; //this can be either page or resource

  private state = {
    counter: 0,
    message: '',
    submittedMessage: '',
    ip: '',
    weatherInfo: {}
  }

  public async loader({ request, params }) {
    return {
      a: 20
    }
  }

  public async action({ request, params }) {
  }

  public view(data, store) {
    store.incrementCounter = () => {
      store.setCounter(this.state.counter + 1);
    }

    store.submitMessage = () => {
      if (this.state.message.length > 0) {
        console.log(`submit ${this.state.message}`);
        store.setSubmittedMessage(this.state.message);
      }
      store.setMessage("");
    }

    store.fetchCurrentIP = () => {
      (async () => {
        const jsonData = await store.fetchJSON("https://api64.ipify.org?format=json");
        store.setIp(jsonData.ip);
      })();
    }

    store.fetchWeatherForcast = () => {
      (async () => {
        const jsonData = await store.fetchJSON("http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json");
        store.setWeatherInfo(jsonData);
      })();
    }

    store.onload = () => {
      store.fetchCurrentIP();
    }

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
}

///// The following will be auto generated /////
import { useLoaderData } from "@remix-run/react";
import CoreRoute from "~/core/Route";
import BaseStore from "~/core/BaseStore"; 

const route = new Route();

export async function loader(context) {
  return route.loader(context);
}

export async function action(context) {
  return route.action(context);
}

//we can do this trick!!! so that we do not export a view, the route then becomes a resource route!!!
export default null;

/*
export default () => {
  const data = useLoaderData();
  const store = new BaseStore()._populateState(route.getState())._init();
  return route.view(data, store);
}
*/
