import { Route } from "react-router-dom";
import BaseController from '../../libs/BaseController';
import { renderToString } from "react-dom/server";
import { RemixServer } from "@remix-run/react";
import View from '../../webclient/views/index';

export default class IndexController extends BaseController
{
  public handleGET() {
    const data = {
      a: 1
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

  public handlePOST() {
    return {
      b: 2
    }
  }
}
