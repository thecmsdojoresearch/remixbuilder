////////// The following part can be auto-generated ///////////////
// we can simply have config like 
// {
//  controller: ../server/controllers/IndexController
//  view: ../webclient/views/index
// }
import Controller from '../server/controllers/IndexController';
import view from '../webclient/views/index';

const controller = new Controller();

export const loader = async (context) => {
  controller._init(context);
  return controller[`handle${context.request.method}`]();
}

export const action = async (context) => {
  controller._init(context);
  return controller[`handle${context.request.method}`]();
}

export default view;
