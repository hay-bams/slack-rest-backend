import express from 'express'
import dotenv from 'dotenv';
import { connectDb } from './models/indexm'
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
     Container.set('userController', new Controllers.UserController(Container)) 
}

const registerRoutes = () => {
    const router = require('./routes').default
    app.use(router)
}


registerDependency()
registerRoutes()

const PORT = 3010

app.get('/', function(req, res) {
    return res.send('Slack API')
})

models.sequelize.sync({force: true}).then(() => {
    app.listen(PORT, function() {
        console.log(`server is listening on port ${PORT}`)
    })
})