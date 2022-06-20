const route = {
  async action({ request, params }) {
    const requestJSON = await request.json();
    const username = requestJSON.username;
    const password = requestJSON.password;
  
    const data = {};

    if (username === 'jim' && password === '123') {
      data.token = '';
    }
    
    return data;
  }
}
