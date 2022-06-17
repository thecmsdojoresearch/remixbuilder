export default class BaseController
{
  protected context;
  protected request;
  protected params;
  protected viewComponent;

  public _init(context) {
    this.context = context;
    this.request = context.request;
    this.params = context.params;
  }
}
