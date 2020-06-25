class TeamController {
  constructor(Container) {
    this.team = Container.get('teamService');
    this.create = this.create.bind(this);
  }

  async create(req, res) {
    const team = await this.team.create(req.body, req.user);
    if (!team.ok) return res.status(400).json(team);
    return res.status(201).json(team);
  }
}

export default TeamController;
