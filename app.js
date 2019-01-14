// Express - defines routes
const express = require('express');
var exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
// const db = mongoose('localhost/rbt');
// const
const bodyParser = require('body-parser');
const app = express();

app.engine('hbs', exphbs({defaultLayout: 'main', extname: "hbs"}));
app.set('view engine', 'hbs');
// static files middleware
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Point this to production mongodb datatbase URI
const port = process.env.PORT || 3000;

const mongoUri =
   process.env.MONGODB_URI || "mongodb://localhost:27017/rbt";
mongoose.connect(
   mongoUri,
   { useNewUrlParser: true }
);

const loadReview = mongoose.model('loadReview', {
    loadNum: String,
    waitTime: String,
    loadWeight: String,
    safety: String,
    lights: String,
    waitReason: String,
    otherComments: String
});

// FORM ROUTE
app.get('/review-form', (req, res) => {
    res.render('review-form');
});

// CREATE
app.post('/success', (req,res) => {
    loadReview.create(req.body).then((review) => {
        res.render('success-page')
    }).catch((err) => {
        // catch errors
        console.log(err.message);
    });
});

// SHOW Success Form
app.get('/success', (req, res) => {
    res.render('success-page');
})


// OUR MOCK ARRAY OF LOAD INFO
const Load = mongoose.model ('Load', {
    pickupDate: String,
    originLocation: String,
    destination: String,
    price: String
});

// ARRAY OF GOOD DATA
[
        { pickupDate: "01/18/19", originLocation: "246 McAllister Street San Fransico, California", destination: "62169 Addison Drive Joplin, Missiouri", price: "2000", content: "sand"},
        { pickupDate: "01/17/19", originLocation: "555 Post Street San Fransico, California", destination: "54621 Adobe Street Directory, Maine", price: "1800", content: "soap"}
]

// Load Routes
// Preview
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

//CREATE
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
    Load.findById(req.params.id).then((load) => {
        res.render('loads-show', { load : load })
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

app.listen(port, () => {
    console.log('App listening on port 3000!')
});
