/**
 * this is the main route component to be presented in the route
 * if this component file is presented, this route will be rendered as a page
 */
const page = {
  onload() {
    document.title = 'Welcome';
    this.$store.fetchCurrentIP();
  }
}
