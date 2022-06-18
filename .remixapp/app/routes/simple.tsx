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

  const number = 3;

  return (
    <>
      <button onClick={() => {store.incrementCounter()}}>Click</button>
      <input type="text" value={store.getName()} onChange = {(e) => {store.setName(e.target.value)}} />
      <p id={`list-${number}`}>hello</p>
      <ul>
        {(() => { return (
          <li>item23334jim</li>
        )})()}
      </ul>
    </>
  )
}
