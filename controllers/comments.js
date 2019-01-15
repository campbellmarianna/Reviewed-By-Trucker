// NEW comment
Comment = require('../models/comment')

module.exports = function (app) {

    // CREATE comment
    app.post('/loads/comments', (req, res) => {
        Comment.create(req.body).then(comment => {
            // console.log(comment)
            res.redirect(`/loads/${comment.loadId}`);
        }).catch((err) => {
            console.log(err.message);
        });
    });

    // DELETE
    app.delete('/loads/comments/:id', function (req, res) {
        console.log("DELETE comment");
        Comment.findByIdAndRemove(req.params.id).then((comment) => {
            res.redirect(`/`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

}
