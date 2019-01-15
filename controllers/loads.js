//loads.js
const Load = require('../models/load');
const Comment = require('../models/comment');

module.exports = function(app, load) {

    // HOME
    app.get('/', (req, res) => {
        res.render('home');
    });

    // INDEX
    app.get('/loads', (req, res) => {
        Load.find()
        .then(loads => {
            res.render('loads-index', {loads : loads});
        }).
        catch(err => {
            console.log(err);
        });
    });

    // NEW
    app.get('/loads/new', (req, res) => {
        res.render('loads-new');
    })

    // CREATE
    app.post('/loads', (req, res) => {
        Load.create(req.body).then((load) => {
            console.log(load)
            res.redirect(`/loads/${load._id}`);
        }).catch((err) => {
            console.log(err.message);
        });
    });

    // SHOW
    app.get('/loads/:id', (req, res) => {
        // fund load
        Load.findById(req.params.id).then((load) => {
            // fetch its comments
            Comment.find({ loadId: req.params.id }).then(comments => {
                // respond with the template with both values
                res.render('loads-show', { load : load, comments : comments})
            })
        }).catch((err) => {
            console.log(err.message);
        });
    });

    // DELETE
    app.delete('/loads/:id', function (req,res) {
        Load.findByIdAndRemove(req.params.id).then((load) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        });
    });

    // EDIT
    app.get('/loads/:id/edit', (req, res) => {
        Load.findById(req.params.id, function(err, donation) {
            res.render('loads-edit', {load: load});
        });
    });

    // UPDATE
    app.put('loads/:id', (req, res) => {
        Load.findByIdAndUpdate(req.params.id, req.body)
        .then(load => {
            res.redirect(`/loads/${load.id}`)
        })
        .catch(err => {
            console.log(err.message)
        });
    });
}
