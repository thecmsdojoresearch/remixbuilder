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

  public view({data, store, state}) {
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
  }
}
