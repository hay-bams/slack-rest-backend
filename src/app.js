import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import Models from './models';
import Controllers from './controllers';
import Services from './services';

const { Container } = require('typedi');

dotenv.config();

const app = express();

const registerDependency = () => {
  Container.set('Models', Models);
  Container.set('userService', new Services.UserService(Models.User));
  Container.set('teamService', new Services.TeamService(Models.Team));
  Container.set('channelService', new Services.ChannelService(Models.Channel));
  Container.set('messageService', new Services.MessageService(Models.Message));
  Container.set('registerService', new Services.RegisterService(Models.User));
  Container.set('userController', new Controllers.UserController(Container));
  Container.set('teamController', new Controllers.TeamController(Container));
  Container.set('channelController', new Controllers.ChannelController(Container));
  Container.set('messageController', new Controllers.MessageController(Container));
  Container.set('registerController', new Controllers.RegisterController(Container));
};

const registerMiddleware = () => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  const router = require('./Routes/Index').default;
  app.use(router);
};

registerDependency();
registerMiddleware();

const PORT = 3010;

app.get('/', (req, res) => res.send('Slack API'));

Models.sequelize.sync({}).then(() => {
  app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
  });
});
