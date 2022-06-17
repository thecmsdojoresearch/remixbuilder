import BaseStore from '../../core/BaseStore';

export default class IndexStore extends BaseStore
{
  private state = {
    counter: 0,
    message: '',
    submittedMessage: '',
    ip: '',
    weatherInfo: {}
  }

  public incrementCounter() {
    this.setCounter(this.state.counter + 1);
  }

  public submitMessage() {
    if (this.state.message.length > 0) {
      console.log(`submit ${this.state.message}`);
      this.setSubmittedMessage(this.state.message);
    }
    this.setMessage("");
  }

  public fetchCurrentIP() {
    (async () => {
      const jsonData = await this.fetchJSON("https://api64.ipify.org?format=json");
      this.setIp(jsonData.ip);
    })();
  }

  public fetchWeatherForcast() {
    (async () => {
      const jsonData = await this.fetchJSON("http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=astro&output=json");
      this.setWeatherInfo(jsonData);
    })();
  }

  public onload() {
    this.fetchCurrentIP();
  }
}
