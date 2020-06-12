import express from 'express'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import Models from './models';
import Controllers from './controllers';
import Services from './services'; 
import models from './models';


const Container = require("typedi").Container;

dotenv.config()

const app = express();

const registerDependency =  () => {
     Container.set('Models', Models)
     Container.set('userService', new Services.UserService(Models.User))
     Container.set('teamService', new Services.TeamService(Models.Team))
     Container.set('channelService', new Services.ChannelService(Models.Channel))
     Container.set('messageService', new Services.MessageService(Models.Message))
     Container.set('userController', new Controllers.UserController(Container)) 
     Container.set('teamController', new Controllers.TeamController(Container)) 
     Container.set('channelController', new Controllers.ChannelController(Container)) 
     Container.set('messageController', new Controllers.MessageController(Container)) 
}

const registerMiddleware = () => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
  
    const router = require('./Routes/Index').default;
    app.use(router);
  };


registerDependency()
registerMiddleware()

const PORT = 3010

app.get('/', function(req, res) {
    return res.send('Slack API')
})

models.sequelize.sync({}).then(() => {
    app.listen(PORT, function() {
        console.log(`server is listening on port ${PORT}`)
    })
})