class LoginController {
  constructor(Container) {
    this.login = Container.get('loginService');
    this.index = this.index.bind(this);
  }

  async index(req, res) {
    const user = await this.login.index(req.body);
    if (!user.ok) return res.status(400).json(user);
    return res.status(201).json(user);
  }
}

export default LoginController;
