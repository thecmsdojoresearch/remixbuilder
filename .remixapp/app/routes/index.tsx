import ControllerGET from '../server/controllers/index';
import ControllerPOST from '../server/controllers/index';
import View from '../webclient/views/index/show';
export default View;
export const loader = async (context) => {
  const controller = new ControllerGET();
  controller._init(context);
  return controller.show();
}
export const action = async (context) => {
  const controller = new ControllerPOST();
  controller._init(context);
  return controller.handlePost();
}