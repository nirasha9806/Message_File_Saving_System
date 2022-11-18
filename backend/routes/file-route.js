const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file-controller');

router.post('/add', fileController.uploadFiles);
module.exports = router;