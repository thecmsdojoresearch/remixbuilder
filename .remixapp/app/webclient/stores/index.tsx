import BaseStore from '../../libs/BaseStore';

export default class IndexStore extends BaseStore
{
  private state = {
    counter: 0,
    message: '',
    submittedMessage: '',
    ip: '',
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
      const result = await fetch("https://api64.ipify.org?format=json");
      const ipData = await result.json();
      this.setIp(ipData.ip);
    })();
  }
}