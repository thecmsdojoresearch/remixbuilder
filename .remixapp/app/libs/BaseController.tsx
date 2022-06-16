import { renderToString } from "react-dom/server";

export default class BaseController
{
  protected request;
  protected context;
  protected viewComponent;

  public _init(context) {
    this.context = context;
    this.request = context.request;
  }

  public handleGET() {
  }

  public handlePOST() {
  }

  public handlePUT() {
  }

  public handlePATCH() {
  }

  public handleDELETE() {
  }

  public _getView() {
    return this.viewComponent;
  }

  protected renderView(viewComponent) {
    this.viewComponent = viewComponent;
  }
}
