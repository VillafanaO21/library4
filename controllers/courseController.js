const {Course, Student, StudentCourses} = require('../models')
const departments = ['Math', 'English', 'Music', 'Art', 'PE', 'WorldLanguage', 'Social Studies', 'Science'].sort();

//view all
module.exports.viewAll = async function (req,res) {
    const courses = await Course.findAll();
    res.render('courses/view_all', {courses});
}

//profile
module.exports.viewProfile= async function(req,res) {
    const course = await Course.findByPk(req.params.id, {
        include: 'students'
    });
    const students = await Student.findAll();
    let availableStudents = [];
    for (let i = 0; i < students.length; i++) {
        if (!courseHasStudent(course, students[i])) {
            availableStudents.push(students[i])
        }
    }
    res.render('courses/profile', {course, availableStudents})
}

//render add form
module.exports.renderAddForm = function(req, res){
    const course = {
        name:'',
        departments: department[0],
        instructor_name: '',
        description:''
    }
    res.render('courses/add', {course, department});
}

//add
module.exports.addCourse = async function(req, res){
    const course = await Course.create({
        name:req.body.name,
        departments:req.body.department,
        instructor_name: req.body.instructor_name,
        description:req.body.description
    });
    res.redirect(`/courses/profile/${course.id}`);
}

//render edit form
module.exports.renderEditForm = async function(req,res){
    const course = await Course.findByPk(req.params.id);
    res.render('courses/edit', {course,departments});
}

//update
module.exports.updateCourses = async function(req, res){
    const course = await Course.update({
        name:req.body.name,
        departments:req.body.department,
        instructor_name: req.body.instructor_name,
        description:req.body.description
    }, {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/courses/profile/${req.params.id}`);
}

//delete
module.exports.deleteCourse = async function(req, res){
    await Course.destroy({
        where: {
            id:req.params.id
        }
    });
    res.redirect('/courses');
}

function courseHasStudent(course, student) {
    for (let i = 0; i < course.students.length; i++){
        if (student.id === course.students[i].id) {
            return true
        }
    }
    return false
}

//Add student to a course
module.exports.enrollStudent= async function(req, res){
    await StudentCourses.create({
        student_id: req.body.student,
        course_id: req.params.course_id
    });
    res.redirect('/courses/profile/${req.params.courseId}')
}

function courseHasStudent(course, student) {

}