const express = require('express');
const historyController = require('../../controllers/history.controller');
const router = express.Router();

router.get('/', historyController.handleGetHistory);
router.post('/postHistory', historyController.handlePostHistory);
router.get('/getHistory/:id', historyController.handleGetHistoryById);
router.get('/getHistoryAll', historyController.handleGetHistoryAll);
module.exports = router;
