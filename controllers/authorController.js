const {Student, Course, StudentCourses} = require('../models')

//view all
module.exports.viewAll = async function (req, res) {
    const students = await Student.findAll();
    res.render('author/view_all', {students});
}

//profile
module.exports.viewProfile = async function (req, res) {
    const student = await Student.findByPk(req.params.id,{
        include: 'courses'
    });
    const courses = await Course.findAll();
    let availableCourses = [];
    for (let i=0; i<courses.length; i++){
        if (!studentHasCourse(student, courses[i])){
            availableCourses.push(courses[i]);
        }
    }
    res.render('author/profile', {student, availableCourses})
}

//render add
module.exports.renderAddForm = function (req, res) {
    const student = {
        first_name: '',
        last_name: '',
        written_books: '',
        date_of_birth:'',
    }
    res.render('author/add', {Authors});
}

//add
module.exports.addAuthor = async function (req, res) {
    const student = await Student.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        written_books: req.body.written_books,
        date_of_birth: req.body.date_of_birth

    });
    res.redirect(`/authors/profile/${author.id}`);
}

//render edit
module.exports.renderEditForm = async function (req, res) {
    const author = await Author.findByPk(req.params.id);
    res.render('author/edit', {author});
}

//edit

//delete
module.exports.deleteAuthor = async function(req, res){
    await Author.destroy({
        where: {
            id:req.params.id
        }
    });
    res.redirect('/authors');
}

//update
module.exports.updateAuthor = async function (req, res) {
    const author = await Author.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        written_books: req.body.written_books,
        date_of_birth: req.body.date_of_birth

    }, {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/authors/profile/${req.params.id}`);
}
function authorHasBooks(author, book) {
    for (let i=0; i<author.books.length; i++){
        if (book.id === author.books[i].id){
            return true
        }
    }
    return false
}

//Add course to author
module.exports.addAuthor = async function (req, res) {

    await Authorsbooks.create({
        author_id: req.body.authorId,
        book_id: req.body.book
    })
    res.redirect(`/books/profile/${req.params.bookId}`);
}

//delete books from author
module.exports.removeBook = async function(req, res){
    await Authorsbooks.destroy({
        where: {
            author_id: req.params.authortId,
            booke_id: req.params.book_id
        }
    });
    res.redirect(`/auhtors/profile/${req.params.authorId}`)
}