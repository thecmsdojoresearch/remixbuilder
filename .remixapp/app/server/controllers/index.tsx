import { Route } from "react-router-dom";
import BaseController from '~/core/BaseController';
import { renderToString } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import View from '~/webclient/views/index';

export default class IndexController extends BaseController
{
  public show() {
    const data = {
      a: 25
    }
   
    /*
    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", "text/html");

    return new Response("...", {
      status: 200,
      headers: responseHeaders,
    });
    */
    return data;
  } 

  public handlePost() {
    console.log("posting");
    const data = {
      b: 23
    }

    return data;
  }
}
