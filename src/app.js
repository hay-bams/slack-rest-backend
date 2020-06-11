import express from 'express'
import dotenv from 'dotenv';
import { connectDb } from './models'
import Models from './models';
import Controllers from './controllers';
import Services from './services';


const Container = require("typedi").Container;

dotenv.config()

const app = express();

const registerDependency =  () => {
     Container.set('userService', new Services.UserService(Models.User))
     Container.set('userController', new Controllers.UserController(Container)) 
}

const registerRoutes = () => {
    const router = require('./routes').default
    app.use(router)
}

connectDb().then(() => {
    console.log('Database connected')
})

registerDependency()
registerRoutes()

const PORT = 3010

app.get('/', function(req, res) {
    return res.send('Slack API')
})

app.listen(PORT, function() {
    console.log(`server is listening on port ${PORT}`)
})