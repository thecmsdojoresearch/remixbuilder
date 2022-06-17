import BaseStore from '../../../core/BaseStore';

export default class G24Store extends BaseStore
{
  private state = {
    number1: 1,
    number2: 2,
    number3: 3,
    number4: 4,
    answers: {}
  }

  public onload() {
  }

  public showAnswer() {
    (async() => {
      const result = await this.fetchJSON('/api/game/24/answer', 'POST', {
        number1 : this.state.number1,
        number2 : this.state.number2,
        number3 : this.state.number3,
        number4 : this.state.number4,
      });

      this.setAnswers(result.data.answers);
    })();
  }
}
