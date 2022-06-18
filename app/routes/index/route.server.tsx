class Route extends CoreRoute
{
  public async loader({ request, params }) {
    return {
      word: 'me'
    }
  }

  public async action({ request, params }) {
  
  }
}
