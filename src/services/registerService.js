import bcrypt from 'bcrypt';
import _ from 'lodash';
import { ValidationError } from 'sequelize';

class RegisterService {
  constructor(userModel) {
    this.userModel = userModel;
    this.formatErrors = this.formatErrors.bind(this);
  }

  formatErrors(e) {
    if (e instanceof ValidationError) {
    //  _.pick({a: 1, b: 2}, 'a') => {a: 1}
      return e.errors.map((x) => _.pick(x, ['path', 'message']));
    }
    return [{ path: 'name', message: 'something went wrong' }];
  }

  async create(body) {
    try {
      if (body.password.length < 5 || body.password.length > 100) {
        return {
          ok: false,
          errors: [
            {
              path: 'password',
              message: 'The password needs to be between 5 and 100 characters long',
            },
          ],
        };
      }
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const user = await this.userModel.create({ ...body, password: hashedPassword });
      return {
        ok: true,
        user,
      };
    } catch (err) {
      return {
        ok: false,
        errors: this.formatErrors(err),
      };
    }
  }
}

export default RegisterService;
