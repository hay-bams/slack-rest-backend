class RegisterController {
  constructor(Container) {
    this.register = Container.get('registerService');
    this.create = this.create.bind(this);
  }

  async create(req, res) {
    const user = await this.register.create(req.body);
    if (!user.ok) return res.status(400).json(user);
    return res.status(201).json(user);
  }
}

export default RegisterController;
