class ChannelService {
  constructor(Models) {
    this.models = Models;
    this.channelModel = Models.Channel;
  }

  async create(body) {
    return await this.channelModel.create(body);
  }
}

export default ChannelService;
