const page = (data, store, state) => {
  const incrementCounter = () => {
  }

  return (
    <div>
      <h1>Counter Value: {state.counter}</h1>
      <button onClick={incrementCounter}>Click</button>
    </div>
  );
}
