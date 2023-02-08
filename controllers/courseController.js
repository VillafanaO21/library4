const {Course} = require('../models')
const departments = ['Math', 'English', 'Music', 'Art', 'PE', 'WorldLanguage', 'Social Studies', 'Science'].sort();

//view all
module.exports.viewAll = async function (req,res) {
    const courses = await Course.findAll();
    res.render('courses/view_all', {courses});
}

//profile
module.exports.viewProfile= async function(req,res){
    const course = await Course.findByPk(req.params.id);
    res.render('courses/profile', {course})
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