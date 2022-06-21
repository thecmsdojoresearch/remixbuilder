const store = {
  state: {
    username: '',
    password: '',
    counter: 0,
    ip: '',
    number: 3,
    isLoggedIn: false,
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
