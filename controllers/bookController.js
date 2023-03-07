const {Book: BookController} = require('../models')

//View All
module.exports.viewAll = async function (req, res) {
    const book = await books.findAll();
    res.render('book/view_all', {books});
}

//Profile

//Render add form

//add

//render edit form
module.exports.renderEditForm = async function(req, res){
    const book = await Books.findByPK(req.params.id);
    res.render('book/edit', {book, tittle});
}

//update
module.exports.updateCourse = async function(req, res){
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

//delete