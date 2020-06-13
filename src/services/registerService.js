import bcrypt from 'bcrypt';

class RegisterService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async create(body) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    return await this.userModel.create({...body, password: hashedPassword});
  }
}

export default RegisterService;
