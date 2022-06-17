export default class Route
{
  protected state = {};

  public getState() {
    return this.state;
  }

  public async loader({ request, params }) {
    return {};
  }

  public async action({ request, params }) {
    return {};
  }

}
