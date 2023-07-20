const express = require('express');
const router = express.Router();
const OderController = require('../../controllers/oder.Controller');

router.post('/', OderController.postOder);
router.get('/getOder', OderController.getAllOder);
router.get('/:id', OderController.getOderById);

module.exports = router;
