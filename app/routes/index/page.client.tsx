/**
 * this is the main route component to be presented in the route
 * if this component file is presented, this route will be rendered as a page
 */
import { fetchJSON } from '~/core';

const loginBlock = (
  <h1>Login Block</h1>
);

const page = {
  async login() {
    const result = await fetchJSON('/api/user/login','POST', {
      username: store.state.username,
      password: store.state.password
    });
    if (result.token && result.token.length > 0) {
      window.localStorage.setItem("token", result.token);
      window.location.reload();
    }
  },
  logout() {
    window.localStorage.removeItem("token");
    window.location.reload();
  },
  isLoggedIn() {
    let result = false;
    const token = window.localStorage.getItem('token');
    if (token !== null && token.length > 0) {
      result = true;
    }
    return result;
  },
  onload() {
    document.title = 'Welcome to the home page';
    if (this.isLoggedIn()) {
      store.set('isLogin', true);
    }
  }
}
