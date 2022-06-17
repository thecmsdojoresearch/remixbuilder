import BaseController from '~/core/BaseController';
import { renderToString } from "react-dom/server";

export default class ComponenhtController extends BaseController
{
  public view() {
    const headers = new Headers();
    headers.set('Content-Type','text/html');
    const status = 200;

    const component = (
      <h1>component</h1>
    );

    return new Response(renderToString(component), {
      headers,
      status
    });
  } 
}
