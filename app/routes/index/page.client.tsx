/**
 * this is the main route component to be presented in the route
 * if this component file is presented, this route will be rendered as a page
 */
const page = {
  login() {
    console.log(store.state.username);
    console.log(store.state.password);
  },
  onload() {
    document.title = 'Welcome to the home page';
    store.fetchCurrentIP();
  }
}
