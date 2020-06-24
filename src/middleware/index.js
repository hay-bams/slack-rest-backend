import AddUser from './addUser';

export default () => ({
  addUser: new AddUser().handle,
});
