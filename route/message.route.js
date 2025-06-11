const express = require('express');
const messageController = require('./../controller/message.controller.js');
const reactionController = require('../controller/reaction.controller.js');
const auth = require('../middleware/auth.middleware.js');
const multer = require('../middleware/multer.middleware.js');

const router = express.Router();

router.get('/', auth, messageController.getAll);
router.get('/:id', auth, messageController.getByID);
router.post('/', auth, multer, messageController.create);
router.put('/:id', auth, multer, messageController.update);
router.delete('/:id', auth, messageController.delete);

// reactions
router.post('/:id/emotions', auth, reactionController.add);
router.delete('/:id/emotions', auth, reactionController.delete);

module.exports = router;