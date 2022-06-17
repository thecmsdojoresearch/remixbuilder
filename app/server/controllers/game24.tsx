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
    const answers = [
      [1,2,3,4],
      [3,3,7,7],
    ];

    const params = this.params

    return { answers }
  }
}
