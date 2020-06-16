class TeamService {
  constructor(Models) {
    this.models = Models;
    this.teamModel = Models.Team;
  }

  async create(body) {
    return await this.teamModel.create(body);
  }
}

export default TeamService;
