class TeamService {
    constructor(teamModel) {
        this.teamModel = teamModel
    }

    async create(body) {
        return await this.teamModel.create(body)
    }
}

export default TeamService;