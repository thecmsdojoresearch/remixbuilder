import view from '../webclient/views/about';

import Controller from '../server/controllers/index';

const controller = new Controller();

export const loader = async (context) => {
  controller._init(context);
  return controller[`handle${context.request.method}`]()
}

export const action = async (context) => {
  controller._init(context);
  return controller[`handle${context.request.method}`]();
}

export default view;
