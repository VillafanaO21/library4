var express = require('express');
var router = express.Router();
const bookController = require('../controllers/bookController.js');

router.get ('/books', bookController.viewAll);

router.get('/books/edit/:id', bookController.renderEditForm);

module.exports = router;