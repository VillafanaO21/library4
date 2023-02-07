const {Course} = require('../models')

//view all
module.exports.viewAll = async function (req,res) {
    const courses = await Course.findAll();
    res.render('courses/view_all', {courses});
}

//profile
module.exports.viewAll= async function(req,res){
    const course = await Course.findByPk(req.params.id);
    res.render('courses/profile', {course})
}

//render add form

//add

//render edit form

//update

//delete