class MessageService {
  constructor(messageModel) {
    this.messageModel = messageModel;
  }

  async create(body) {
    return await this.messageModel.create(body);
  }
}

export default MessageService;
