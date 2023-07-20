const express = require('express');
const router = express.Router();
const oderItemController = require('../../controllers/oderItem.controllers');

router.get('/getOderItem', oderItemController.handleGetOderItem);
router.post('/postOderItem', oderItemController.handlePostOderItem);
router.delete('/:id', oderItemController.handleDeleteItem);
router.delete('/ById/:id', oderItemController.handleDeleteById);
router.patch('/:id', oderItemController.handlePatchOderItem);
router.get('/:id', oderItemController.handleGetOderItemById);

module.exports = router;
