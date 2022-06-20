export default class Route
{
  protected data = {};
  protected state = {}; //the client state

  public getData() {
    return this.data;
  }

  public async loader({ request, params }) {
    return {};
  }

  public async action({ request, params }) {
    return {};
  }
}
