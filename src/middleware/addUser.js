import jwt from 'jsonwebtoken';
import { refreshTokens } from '../auth';

const { Container } = require('typedi');

class AddUser {
  constructor() {
    this.userModel = Container.get('Models').User;

    this.handle = this.handle.bind(this);
  }

  // eslint-disable-next-line consistent-return
  async handle(req, res, next) {
    const token = req.headers['x-token'];
    if (token) {
      try {
        const { user } = jwt.verify(token, process.env.SECRET);
        req.user = user;
      } catch (err) {
        return res.status(400).json({
          msg: 'token has expired',
        });
        // const refreshToken = req.headers['x-refresh-token'];
        // const newTokens = await refreshTokens(
        //   token,
        //   refreshToken,
        //   this.userModel,
        //   process.env.SECRET,
        //   process.env.SECRET2,
        // );
        // console.log(newTokens, '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        // if (newTokens.token && newTokens.refreshToken) {
        //   res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
        //   res.set('x-token', newTokens.token);
        //   res.set('x-refresh-token', newTokens.refreshToken);
        // }
        // req.user = newTokens.user;
      }
    }
    next();
  }
}

export default AddUser;
