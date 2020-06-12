class ChannelService {
    constructor(channelModel) {
        this.channelModel = channelModel
    }

    async create(body) {
        return await this.channelModel.create(body)
    }
}

export default ChannelService;