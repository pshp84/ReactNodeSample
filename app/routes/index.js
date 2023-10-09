const express = require('express');
const router = express.Router();

const { getRecords, saveRecord } = require('../controllers/main.controller');

router.get('/', getRecords);

router.post('/', saveRecord);

module.exports = router;