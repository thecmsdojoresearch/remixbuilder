import BaseController from '../../libs/BaseController';

export default class IndexController extends BaseController
{
  public handleGET() {
    return {
      a: 1
    }
  }  
}
