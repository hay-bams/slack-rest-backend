import express from 'express';

const { Container } = require('typedi');

const router = express.Router();

// Register
router.post('/register', Container.get('registerController').create);

// Login
router.post('/login', Container.get('loginController').index);

// User
router.get('/users', Container.get('userController').index);
router.get('/users/:id', Container.get('userController').show);

// Team
router.post('/teams', Container.get('teamController').create);

// Channel
router.post('/channels', Container.get('channelController').create);

// Message
router.post('/messages', Container.get('messageController').create);

export default router;
