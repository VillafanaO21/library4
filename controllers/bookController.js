const {Book: BookController} = require('../models')

//View All
module.exports.viewAll = async function (req, res) {
    const book = await books.findAll();
    res.render('book/view_all', {books});
}

//Profile
module.exports.viewProfile= async function(req,res) {
    const course = await Book.findByPk(req.params.id, {
        include: 'students'
    });
    const students = await Author.findAll();
    let availableStudents = [];
    for (let i = 0; i < students.length; i++) {
        if (!bookHasAuthor(course, students[i])) {
            availableAuthors.push(students[i])
        }
    }
    res.render('books/profile', {book, availableAuthors})
}
//Render add form
module.exports.renderAddForm = function(req, res){
    const book = {
        title:'',
        genre: '',
        cover:'',
        pages:'',
        description:'',
        author:'',
        publisher:'',
    }
    res.render('books/add', {book, author});
}

//add
module.exports.addCourse = async function(req, res){
    const course = await Book.create({
        title:req.body.title,
        genre:req.body.genre,
        cover: req.body.cover,
        pages: req.body.pages,
        description: req.body.description,
        publisher: req.body.author,
    });
    res.redirect(`/books/profile/${book.id}`);
}


//render edit form
module.exports.renderEditForm = async function(req, res){
    const book = await Books.findByPK(req.params.id);
    res.render('book/edit', {book, tittle});
}

//update
module.exports.updateBooks = async function(req, res){
    const book = await Book.update({
        title:req.body.title,
        genre:req.body.genre,
        cover:req.body.cover,
        pages:req.body.pages,
        author:req.body.author,
        publisher:req.body.publisher,
    }, {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/book/profile/${req.params.id}`);
}
//update
module.exports.updateBooks = async function(req, res){
    const course = await Book.update({
        title:req.body.title,
        genre:req.body.genre,
        cover:req.body.cover,
        pages:req.body.pages,
        author:req.body.author,
        publisher:req.body.publisher,
    }, {
        where: {
            id: req.params.id
        }
    });
    res.redirect(`/books/profile/${req.params.id}`);
}

//delete
module.exports.deleteBook = async function(req, res){
    await Book.destroy({
        where: {
            id:req.params.id
        }
    });
    res.redirect('/books');
}

function courseHasAuthors(book, author) {
    for (let i = 0; i < book.authors.length; i++){
        if (author.id === book.author[i].id) {
            return true
        }
    }
    return false
}

//Add student to a course
module.exports.enrollAuthors= async function(req, res){
    await authorsbooks.create({
        author_id: req.body.author,
        book_id: req.params.bookId
    });
    res.redirect(`/books/profile/${req.params.bookId}`)
}

//remove a student from a course
module.exports.removeStudent = async function(req, res){
    await authorsbooks.destroy({
        where: {
            book_id: req.params.bookId,
            author_id: req.params.author_id
        }
    });
    res.redirect(`/book/profile/${req.params.bookId}`);
}