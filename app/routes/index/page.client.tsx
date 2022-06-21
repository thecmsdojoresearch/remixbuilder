/**
 * this is the main route component to be presented in the route
 * if this component file is presented, this route will be rendered as a page
 */
import { fetchJSON } from '~/core';

const page = {
  components:{
    left_nav() {
      return (
        <h1>Navigation, {store.state.isLoggedIn? 'true':'false'}</h1>
      );
    }
  },
  async login() {
    const result = await fetchJSON('/api/user/login','POST', {
      username: store.state.username,
      password: store.state.password
    });
    if (result.token && result.token.length > 0) {
      window.localStorage.setItem("token", result.token);
      store.set('isLoggedIn', true);
    }
  },
  logout() {
    window.localStorage.removeItem("token");
    store.set('isLoggedIn', false);
  },
  onload() {
    document.title = 'Welcome to the home page';
    if (window.localStorage.getItem("token") !== null) {
      store.set('isLoggedIn', true);
    } else {
      store.set('isLoggedIn', false);
    }
  }
}
