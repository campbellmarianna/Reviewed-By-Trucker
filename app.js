// Express - defines routes
const express = require('express')
var exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express()

app.engine('hbs', exphbs({defaultLayout: 'main', extname: "hbs"}));
app.set('view engine', 'hbs');
// static files middleware
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))


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
})

// OUR MOCK ARRAY OF LOAD INFO
// let loadReview = [
//     { thirdPartyLoadInfo: Object, loadNum: "02467", waitTime: "30", loadWeight: "200", safety: "No Lights", otherComments: "None" },
//     { thirdPartyLoadInfo: Object, loadNum: "26510", waitTime: "50", loadWeight: "600", safety: "Lights", otherComments: "I like this."}
// ]

// ROOT ROUTE
app.get('/', (req, res) => {
    res.render('review-form');
})

// CREATE
app.post('/review', (req,res) => {
    console.log(req.body);
})


app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
