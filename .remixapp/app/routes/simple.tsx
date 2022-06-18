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

  return (
    <>
      <button onClick={() => {store.incrementCounter()}}>Click</button>
      <input type="text" value={store.getName()} onChange = {(e) => {store.setName(e.target.value)}} />
    </>
  )
}
