import ControllerGET from '../server/controllers/user';
import ControllerPOST from '../server/controllers/user';
export const loader = async (context) => {
  const controller = new ControllerGET();
  controller._init(context);
  return controller.list();
}
export const action = async (context) => {
  const controller = new ControllerPOST();
  controller._init(context);
  return controller.update();
}