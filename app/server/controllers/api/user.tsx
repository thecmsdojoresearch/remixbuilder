import BaseController from '../../../core/BaseController.tsx';

export default class UserController extends BaseController
{
  public list() {
    return [
      {name: 'apiuser1'},
      {name: 'apiuser2'},
      {name: 'apiuser3'},
      {name: 'apiuser4'},
      {name: 'apiuser5'},
    ]
  }

  public update() {
    return [
      {name: 'updated_api_user1'},
      {name: 'updated_api_user2'},
      {name: 'updated_user3'},
      {name: 'updated_user4'},
    ]
  }
}
