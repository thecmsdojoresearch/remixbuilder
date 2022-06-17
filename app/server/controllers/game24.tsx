import BaseController from '../../core/BaseController';

export default class Game24Controller extends BaseController
{
  public show() {
    const data = {
      welcome_essage: "Welcome to 24 game"
    }

    return data;
  } 

  public getAnswer() {
    return {
    }
  }
}
