import { fetchJSON } from '~/core';

const page = {
  onload() {
    document.title = 'Welcome to the home page';
    if (window.localStorage.getItem("token") !== null) {
      window.location.href='/portal';
    }
  }
}
