/**
 * the front end template
 */
export default () => {
  useEffect(() => {
    document.title = "Welcome";
  });

  type IndexStore = {
    state: any
  }

  const store:IndexStore = {
    state: {
      counter: 0
    },

    incrementCounter () {
      store.counterSet(store.state.counter + 1)
    }
  }

  return (
    <h1>Homepage</h1>
  );
};
