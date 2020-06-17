import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { ValidationError } from 'sequelize';

class LoginService {
  constructor(userModel) {
    this.userModel = userModel;
    this.formatErrors = this.formatErrors.bind(this);
    this.createTokens = this.createTokens.bind(this);
  }

  formatErrors(e) {
    if (e instanceof ValidationError) {
    //  _.pick({a: 1, b: 2}, 'a') => {a: 1}
      return e.errors.map((x) => _.pick(x, ['path', 'message']));
    }
    return [{ path: 'name', message: 'something went wrong' }];
  }

  createTokens(user, secret, secret2) {
    const createToken = jwt.sign(
      {
        user: _.pick(user, ['id']),
      },
      secret,
      {
        expiresIn: '1h',
      },
    );

    const createRefreshToken = jwt.sign(
      {
        user: _.pick(user, 'id'),
      },
      secret2,
      {
        expiresIn: '7d',
      },
    );

    return [createToken, createRefreshToken];
  }

  async index(body) {
    try {
      const user = await this.userModel.findOne({ where: { email: body.email }, raw: true });
      if (!user) {
        // user with provided email not found
        return {
          ok: false,
          errors: [{ path: 'email', message: 'Wrong email' }],
        };
      }
      const valid = await bcrypt.compare(body.password, user.password);
      if (!valid) {
        // bad password
        return {
          ok: false,
          errors: [{ path: 'password', message: 'Wrong password' }],
        };
      }
      const refreshTokenSecret = user.password + process.env.SECRET;
      const [token, refreshToken] = await this.createTokens(user, process.env.SECRET, refreshTokenSecret);
      return {
        ok: true,
        token,
        refreshToken,
      };
    } catch (err) {
      return {
        ok: false,
        errors: this.formatErrors(err),
      };
    }
  }
}

export default LoginService;
