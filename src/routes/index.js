import express from 'express';

const { Container } = require('typedi');

const router = express.Router();

// User
router.get('/users', Container.get('userController').index);
router.get('/users/:id', Container.get('userController').show);
router.post('/users', Container.get('userController').create);

// Team
router.post('/teams', Container.get('teamController').create);

// Channel
router.post('/channels', Container.get('channelController').create);

// Message
router.post('/messages', Container.get('messageController').create);

export default router;
