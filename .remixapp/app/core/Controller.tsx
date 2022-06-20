export default class Controller
{
  protected context;
  protected request;
  protected params;

  public _init(context) {
    this.context = context;
    this.request = context.request;
    this.params = context.params;
  }
}
