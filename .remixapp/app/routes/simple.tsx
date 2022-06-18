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

  return (
    <>
      <button onClick={() => {store.incrementCounter()}}>Click</button>
      <input type="text" value={store.getName()} onChange = {(e) => {store.setName(e.target.value)}} />
      <p id={`list-${number}`}>hello</p>
      <div>
        {(() => { const _ = []; for (let i = 0; i < 10; i ++) { _.push(
          <h1>{i}</h1>
        ); } return _; })()}
      </div>
      {
        (() => {
          const _ = [];
          switch(true) {
            case (number > 3):
              _.push(<h1>greater than 3</h1>);
              break;
          }

          return _;
        })()
      }
    </>
  );
}
