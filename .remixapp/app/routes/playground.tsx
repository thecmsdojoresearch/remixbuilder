class Route extends CoreRoute
{
  /**
   * the store will automatically bind to the state
   */
  protected state = {
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

  public view({data, store}) {
    store.incrementCounter = () => {
      store.setCounter(state.counter + 1);
    }

    store.submitMessage = () => {
      if (state.message.length > 0) {
        console.log(`submit ${state.message}`);
        store.setSubmittedMessage(state.message);
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

    const state = this.state;
    return this.template({data, store, state});
  }

  public template({data, store, state}) {
    return (
      <div>
        <h1>Version 10</h1>
        <h1>Via Import</h1>
        <h1>This button has been clicked for {state.counter} times in passing store</h1>
        <h4>Your Current IP Address: {state.ip} </h4>
        <button onClick={()=> { store.incrementCounter() }}>Click</button>
        <h1>{data.a}</h1>

        <div>
          {(() => {
            if (state.submittedMessage.length > 0) {
              return <h4>Submitted Message: {state.submittedMessage}</h4> 
            }
          })()}
          <label>Add Message</label>
          <input type = "text" 
            value = {state.message} 
            onChange = {(e) => {store.setMessage(e.target.value) }}
          />
          <button onClick={ ()=> {store.submitMessage()} }>Submit Message</button>
        </div>
        <button onClick={()=> { store.fetchWeatherForcast() }}>Check Weather Forcast</button>
        <div>Weather Forcast Data</div>
        <div>
          {JSON.stringify(state.weatherInfo)}
        </div>
      </div>
    );
  }
}

///// The following is generated /////
import { useLoaderData } from "@remix-run/react";
import BaseStore from "~/core/BaseStore";
import CoreRoute from "~/core/Route";

const route = new Route();

export async function loader(context) {
  return route.loader(context);
}

export async function action(context) {
  return route.action(context);
}

//super trick to do on demand view export
export default (typeof route.view === 'function') ? () => {
  const data = useLoaderData();
  const store = new BaseStore()._populateState(route.getState())._init();
  return route.view({data, store});
} : null
