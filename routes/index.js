var express = require('express');
var router = express.Router();
const courseController = require('../controllers/courseController.js');
const studentsController = require('../controllers/studentsController.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/courses', courseController.viewAll);

router.get('/courses/profile/:id', courseController.viewProfile)

router.get('/courses/edit/:id', courseController.renderEditForm);

router.post('/courses/edit/:id', courseController.updateCourses);

router.get('/courses/add', courseController.renderAddForm);

router.post('/courses/add', courseController.addCourse);

router.get('/courses/delete/:id', courseController.deleteCourse);


router.get('/students', studentsController.viewAll);

router.get('/students/profile/:id', studentsController.viewProfile);

router.get('/students/edit/:id', studentsController.renderEditForm);

router.post('/students/edit/:id', studentsController.updateStudent);

router.get('/students/add', studentsController.renderAddForm);

router.post('/students/add', studentsController.addStudent);

router.get('/students/delete/:id', studentsController.deleteStudent);

module.exports = router;