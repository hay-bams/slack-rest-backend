import { formatErrors } from '../helpers/formatErrors';
import { tryLogin } from '../auth';

class LoginService {
  constructor(userModel) {
    this.userModel = userModel;
    this.formatErrors = formatErrors;
  }

  async index(body) {
    try {
      return tryLogin(body, this.userModel);
    } catch (err) {
      return {
        ok: false,
        errors: this.formatErrors(err),
      };
    }
  }
}

export default LoginService;
