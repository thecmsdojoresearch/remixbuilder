const store = {
  state: {
    counter: 0
  },
  incrementCounter () {
    store.counterSet(store.state.counter + 1)
  }
}
