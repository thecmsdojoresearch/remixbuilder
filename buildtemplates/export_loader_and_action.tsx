export const loader = async (context) => {
  const controller = new ControllerMap[context.request.method]();
  controller._init(context);
  return controller[`handle${context.request.method}`]()
}

export const action = async (context) => {
  const controller = new ControllerMap[context.request.method]();
  controller._init(context);
  return controller[`handle${context.request.method}`]();
}
