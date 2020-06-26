import { formatErrors } from '../helpers/formatErrors';

class TeamService {
  constructor(teamModel) {
    this.teamModel = teamModel;
    this.formatErrors = formatErrors;
    this.index = this.index.bind(this);
  }

  async index(user) {
    const teams = await this.teamModel.findAll({
      where: {
        owner: user.id,
      }

    }, { raw: true });

    return teams;
  }

  async create(body, user) {
    try {
      await this.teamModel.create({ ...body, owner: user.id });
      return {
        ok: true,
      };
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return {
        ok: false,
        errors: this.formatErrors(err),
      };
    }
  }
}

export default TeamService;
