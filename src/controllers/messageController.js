class MessageController {
  constructor(Container) {
    this.message = Container.get('messageService');
    this.create = this.create.bind(this);
  }

  async create(req, res) {
    const message = await this.message.create({ ...req.body, userId: 1 });
    return res.status(201).json(message);
  }
}

export default MessageController;
