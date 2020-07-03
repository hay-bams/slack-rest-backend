import { formatErrors } from '../helpers/formatErrors';
import { padEnd } from 'lodash';

class TeamService {
  constructor(Models) {
    this.teamModel = Models.Team;
    this.channelModel = Models.Channel;
    this.formatErrors = formatErrors;
    this.index = this.index.bind(this);
  }

  async index(user) {
    const teams = await this.teamModel.findAll({
      where: {
        owner: user.id,
      },

    }, { raw: true });

    return teams;
  }

  async create(body, user) {
    try {
      const team = await this.teamModel.create({ ...body, owner: user.id });
      await this.channelModel.create({ name: 'general', public: true, teamId: team.id });
      return {
        ok: true,
        team
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
