export const loader = async (context) => {
  controller._init(context);
  return controller[`handle${context.request.method}`]()
}

export const action = async (context) => {
  controller._init(context);
  return controller[`handle${context.request.method}`]();
}
