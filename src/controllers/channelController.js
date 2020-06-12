class ChannelController {
    constructor(Container) {
        this.channel = Container.get('channelService')
        this.create = this.create.bind(this)
    }

    async create(req, res) {
        const channel = await this.channel.create(req.body)
        return res.status(201).json(channel)
    }
}
 
export default ChannelController