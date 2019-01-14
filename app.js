// Express - defines routes
const express = require('express');
var exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
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

// ROOT ROUTE
app.get('/', (req, res) => {
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
const loads = [
    { pickupDate: "01/18/19", originLocation: "246 McAllister Street San Fransico, California", destination: "62169 Addison Drive Joplin, Missiouri", price: "2000", content: "sand"},
    { pickupDate: "01/17/19", originLocation: "555 Post Street San Fransico, California", destination: "54621 Adobe Street Directory, Maine", price: "1800", content: "soap"}
];

// Load Routes
// INDEX
app.get('/loads', (req, res) => {
    res.render('loads-index', {loads : loads})
})
app.listen(port, () => {
    console.log('App listening on port 3000!')
});

// SHOW
app.get('/loads/:id', (req, res) => {
    var loadId = req.params.id;
    var load = loads[loadId]
    res.render('loads-show', { load : load})
})
