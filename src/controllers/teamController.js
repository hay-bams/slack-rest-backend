class TeamController {
  constructor(Container) {
    this.team = Container.get('teamService');
    this.create = this.create.bind(this);
    this.index = this.index.bind(this);
  }

  async index(req, res) {
    const teams = await this.team.index(req.user);
    return res.status(200).json(teams);
  }

  async create(req, res) {
    const team = await this.team.create(req.body, req.user);
    if (!team.ok) return res.status(400).json(team);
    return res.status(201).json(team);
  }
}

export default TeamController;
