class UserController {
  constructor(Container) {
    this.user = Container.get('userService');
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.create = this.create.bind(this);
  }

  async index(req, res) {
    const users = await this.user.index();
    return res.status(200).json(users);
  }

  async show(req, res) {
    const user = await this.user.show(req.params.id);
    return res.status(200).json(user);
  }

  async create(req, res) {
    const user = await this.user.create(req.body);
    return res.status(201).json(user);
  }
}

export default UserController;
