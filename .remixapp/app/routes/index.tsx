const route = {
  async loader({ request, params }) {
    return {
      word: 'me'
    }
  },
  async action({ request, params }) {
    return {
      word: 'post'
    }
  }
}

const page = {
  onload() {
    document.title = 'Welcome';
    this.$store.fetchCurrentIP();
  }
}

const store = {
  state: {
    counter: 0,
  },
  incrementCounter() {
    this.set('counter', this.state.counter + 1);
  },
  decrementCounter() {
    this.set('counter', this.state.counter - 1);
  },
  fetchCurrentIP() {
    this.set('ip','127.0.0.1');
  }
}

/////////// Auto Generated Code ///////////
import { initStore } from '../core';
export default () => {
  initStore(store);
  console.log(store);

  return (
    <h1>Current IP: 127.0.0.2</h1>
  );
}
