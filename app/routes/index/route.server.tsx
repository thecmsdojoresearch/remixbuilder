const route = {
  async loader({ request, params }) {
    return {
      word: 'me'
    }
  },
  async action({ request, params }) {
    return {
      word: 'post'
    }
  }
}
