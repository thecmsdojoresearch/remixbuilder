import ControllerGET from '../../server/controllers/game24';
import View from '../../webclient/views/game24/show';
export default View;
export const loader = async (context) => {
  const controller = new ControllerGET();
  controller._init(context);
  return controller.show();
}