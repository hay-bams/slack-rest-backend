import express from 'express';

const Container = require("typedi").Container;

const router = express.Router();
 
router.post('/singup', Container.get('userController').signup)

export default router;