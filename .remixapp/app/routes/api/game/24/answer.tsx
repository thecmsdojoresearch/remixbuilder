import ControllerPOST from '../../../../server/controllers/game24';
export const action = async (context) => {
  const controller = new ControllerPOST();
  controller._init(context);
  return controller.getAnswer();
}