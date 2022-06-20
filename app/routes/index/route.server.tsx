const route = {
  async loader({ request, params }) {
    const secret = "123456";
    return {
      word: 'me'
    }
  },
  async action({ request, params }) {
    console.log(request.json());
    return {
      word: 'post'
    }
  }
}
