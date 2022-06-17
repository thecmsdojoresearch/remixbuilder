import BaseController from '../../core/BaseController';

export default class Game24Controller extends BaseController
{
  public show() {
    const data = {
      welcome_essage: "Welcome to 24 game"
    }

    return data;
  } 

  public async getAnswer() {
    const answers = [
      [1,2,3,4],
      [3,3,7,7],
    ];

    //get the request payload
    const payload = await this.request.json();

    const numbers = [
      payload.number1,
      payload.number2,
      payload.number3,
      payload.number4
    ];

    return { numbers, answers }
  }
}
