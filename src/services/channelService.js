class ChannelService {
  constructor(ChannelModel) {
    this.channelModel = ChannelModel;
    this.create = this.create.bind(this);
    this.findTeamChannels = this.findTeamChannels.bind(this);
  }

  async findTeamChannels(teamId) {
    const channels = await this.channelModel.findAll({
      where: {
        teamId,
      },
    });

    return channels;
  }

  async create(body) {
    return await this.channelModel.create(body);
  }
}

export default ChannelService;
