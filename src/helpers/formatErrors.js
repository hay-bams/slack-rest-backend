import _ from 'lodash';
import { ValidationError } from 'sequelize';

export const formatErrors = (e) => {
  if (e instanceof ValidationError) {
    //  _.pick({a: 1, b: 2}, 'a') => {a: 1}
    return e.errors.map((x) => _.pick(x, ['path', 'message']));
  }
  return [{ path: 'name', message: 'something went wrong' }];
};
