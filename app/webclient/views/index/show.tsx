import IndexStore from '../../stores/index'; //stores are like models in client side

export default () => {
  const store = new IndexStore();
  store._init();

  return (
    <>
      <h1>Current IP: {store.getIp()}</h1>
      <button onClick={() => store.fetchCurrentIP() }>
        Fetch Current IP
      </button>
    </>
  );
}
