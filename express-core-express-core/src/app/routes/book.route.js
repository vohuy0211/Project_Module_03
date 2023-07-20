const express = require('express');
const bookController = require('../../controllers/book.controller');
const router = express.Router();

router.get('/getBook', bookController.handleGetBook);
router.post('/postBook', bookController.handlePostBook);
router.get('/getBook/:id', bookController.handleGetBookId);
router.delete('/deleteBook/:id', bookController.handleDelete);
router.get('/searchBook/:searchTerm', bookController.handleSearch);
router.patch('/patchBook/:id', bookController.handlePatchBook);
module.exports = router;
