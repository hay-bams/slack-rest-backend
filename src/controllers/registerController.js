class RegisterController {
  constructor(Container) {
    this.register = Container.get('registerService');
    this.create = this.create.bind(this);
  }

  async create(req, res) {
    const user = await this.register.create(req.body);
    return res.status(201).json(user);
  }
}

export default RegisterController;
