/**
 * this is the main route component to be presented in the route
 * if this component file is presented, this route will be rendered as a page
 */
import { fetchJSON } from '~/core';

const page = {
  login() {
    fetchJSON('/api/user/login','POST', {
      username: store.state.username,
      password: store.state.password
    });
  },
  onload() {
    document.title = 'Welcome to the home page';
    store.fetchCurrentIP();
  }
}
