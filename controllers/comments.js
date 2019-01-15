// NEW comment
Comment = require('../models/comment')

module.exports = function (app) {

    function isValidComment(comment) {
        return comment.title && comment.title.toString() !== '' &&
        comment.content && comment.content.toString() !== '';
    };

    // CREATE comment
    app.post('/loads/comments', (req, res) => {
        if (isValidComment(req.body)) {
            Comment.create(req.body).then(comment => {
                // console.log(comment)
                res.redirect(`/loads/${comment.loadId}`);
            }).catch((err) => {
                console.log(err.message);
            });
        } else {
            res.status(422);
            res.json({
                message : "Hey! Comment information is required."
            })
        }
    });

    // DELETE
    app.post('/loads/comments/delete/:id', function (req, res) {
        console.log("DELETE comment");
        Comment.findByIdAndRemove(req.params.id).then((comment) => {
            res.redirect(`/loads`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

}
