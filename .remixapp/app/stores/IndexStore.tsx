import BaseStore from '../libs/BaseStore';

export default class IndexStore extends BaseStore
{
  private state = {
    counter: 0,
    message: '',
    submittedMessage: ''
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
}
