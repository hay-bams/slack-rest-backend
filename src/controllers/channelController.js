class ChannelController {
  constructor(Container) {
    this.channel = Container.get('channelService');
    this.create = this.create.bind(this);
    this.findTeamChannels = this.findTeamChannels.bind(this)
  }

  async findTeamChannels(req, res) {
    const teamId = parseInt(req.params.teamId, 10);
    const channels = await this.channel.findTeamChannels(teamId);
    return res.status(200).json(channels);
  }

  async create(req, res) {
    const channel = await this.channel.create(req.body);
    return res.status(201).json(channel);
  }
}

export default ChannelController;
