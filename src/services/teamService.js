import { formatErrors } from '../helpers/formatErrors';

class TeamService {
  constructor(teamModel) {
    this.teamModel = teamModel;
    this.formatErrors = formatErrors;
  }

  async create(body) {
    try {
      await this.teamModel.create(body);
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
