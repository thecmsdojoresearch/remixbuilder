export default () => {
  const store = {
    incrementCounter() {
      console.log('counter incremnt');
    },

    getName() {
      return 'getting name';
    },

    setName(value) {
      return 'setting name to ' + value;
    }
  };

  const number = 10;
  const _ = [];

  return (() => {
    _.push(<h1>test1</h1>)
  })();
}
