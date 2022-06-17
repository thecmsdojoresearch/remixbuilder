import ControllerGET from '../../server/controllers/component';
export const loader = async (context) => {
  const controller = new ControllerGET();
  controller._init(context);
  return controller.view();
}