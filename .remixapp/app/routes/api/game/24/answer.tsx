import ControllerGET from '../../../../server/controllers/game24';
export const loader = async (context) => {
  const controller = new ControllerGET();
  controller._init(context);
  return controller.getAnswer();
}