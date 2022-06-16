import BaseController from '../../libs/BaseController';

export default class UserController extends BaseController
{
  public list() {
    return [
      {name: 'user1'},
      {name: 'user2'},
      {name: 'user3'},
      {name: 'user4'},
    ]
  }

  public update() {
    return [
      {name: 'updated_user1'},
      {name: 'updated_user2'},
      {name: 'updated_user3'},
      {name: 'updated_user4'},
    ]
  }
}
