const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message-controller');

router.post('/add', messageController.AddDetails);
module.exports = router;