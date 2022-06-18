class Server
{
  public async loader({ request, params }) {
    const secret = "asecretkeyhere";
    return {
      a: 20
    }
  }

  public async action({ request, params }) {
  }
}

class View
{
  public render() {
    return <h1>Simple View</h1>
  }
}

export default () => {
  return View.render(); 
}
