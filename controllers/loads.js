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

    function isValidLoad(load) {
        return load.company && load.company.toString() !== '' &&
        load.pickupDate && load.pickupDate.toString().trim() !== '' &&
        load.originLocation && load.originLocation.toString() !== '' &&
        load.destination && load.destination.toString() !== '' &&
        load.rate && load.rate.toString() !== '';
    };

    // CREATE
    app.post('/loads', (req, res) => {
        // check if load is valid
        if (isValidLoad(req.body)) {
            // insert into db
            Load.create(req.body).then((load) => {
                // Show the user the load they created
                res.redirect(`/loads/${load._id}`);
            }).catch((err) => {
                // If there is an issue adding the load to the database
                // given the programmer an error message
                console.log(err.message);
            });
        } else {
            // If the load is inputed wrong return a message to the user
            res.status(422);
            res.json({
                message: 'Hey! Load information is required.'
            });
        }

    });
    // const postLoad = async () => {
    //     console.log(await app.)
    // }


    // SHOW
    app.get('/loads/:id', (req, res) => {
        // find load
        Load.findById(req.params.id).then((load) => {
            // fetch its comments
            Comment.find({ loadId: req.params.id }).then(comments => {
                // get one comment id
                // respond with the template with both values
                res.render('loads-show', { load : load, comments : comments})
            })
        // If there is an error thrown catch it and return it to the programmer
        }).catch((err) => {
            console.log(err.message);
        });
    });

    // DELETE
    app.delete('/loads/:id', function (req,res) {
        Load.findByIdAndRemove(req.params.id).then((load) => {
            res.redirect('/loads');
        }).catch((err) => {
            console.log(err.message);
        });
    });

    // EDIT - not operational
    app.get('/loads/:id/edit', (req, res) => {
        Load.findById(req.params.id, function(err, donation) {
            res.render('loads-edit', {load: load});
        });
    });

    // UPDATE - not operational
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
