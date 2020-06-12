class TeamController {
    constructor(Container) {
        this.team = Container.get('teamService')
        this.create = this.create.bind(this)
    }

    async create(req, res) {
        const team = await this.team.create({...req.body, owner: 1})
        return res.status(201).json(team)
    }
}
 
export default TeamController