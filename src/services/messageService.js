class MessageService {
  constructor(Models) {
    this.models = Models;
    this.messageModel = Models.Message;
  }

  async create(body) {
    return await this.messageModel.create(body);
  }
}

export default MessageService;
