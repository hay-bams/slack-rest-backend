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
router.post(
  '/teams',
  Container.get('middleware').addUser,
  Container.get('teamController').create,
);

router.get('/teams',
  Container.get('middleware').addUser,
  Container.get('teamController').index);

// Channel
router.post('/channels', Container.get('channelController').create);
router.get('/channels/:teamId',
  Container.get('middleware').addUser,
  Container.get('channelController').findTeamChannels);

// Message
router.post('/messages', Container.get('messageController').create);

export default router;
