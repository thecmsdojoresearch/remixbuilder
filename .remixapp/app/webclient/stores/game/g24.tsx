import BaseStore from '../../../core/BaseStore';

export default class G24Store extends BaseStore
{
  private state = {
    number1: 1,
    number2: 2,
    number3: 3,
    number4: 4,
  }

  public onload() {
  }

  public showAnswer() {
    console.log(this.state.number1);
    console.log(this.state.number2);
    console.log(this.state.number3);
    console.log(this.state.number4);
  }
}
