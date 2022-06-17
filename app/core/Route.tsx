export default class Route
{
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
