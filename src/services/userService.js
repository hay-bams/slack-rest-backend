class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async index() {
    return await this.userModel.findAll();
  }

  async show(id) {
    return await this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async create(body) {
    return await this.userModel.create(body);
  }
}

export default UserService;
