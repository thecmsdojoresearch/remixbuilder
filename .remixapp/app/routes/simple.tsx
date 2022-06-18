class Server
{
  public static async loader({ request, params }) {
    const secret = "asecretkeyhere";
    return {
      a: 20
    }
  }

  public static async action({ request, params }) {
    return {};
  }
}

class View
{
  public static render() {
    return <h1>Simple View</h1>
  }
}

//////////// The following is auto generated /////////////////
export async function loader() {
  return Server.loader();
}

export async function action() {
  return Server.action();
}

export default () => {
  return View.render(); 
}
