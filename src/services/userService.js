class UserService {
  constructor(Models, ValidationError) {
    this.models = Models;
    this.userModel = Models.User;
    this.validationError = ValidationError;
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
