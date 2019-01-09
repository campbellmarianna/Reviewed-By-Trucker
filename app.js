// Express - defines routes
const express = require('express')
var exphbs = require('express-handlebars');
const path = require('path');
const app = express()

app.engine('hbs', exphbs({defaultLayout: 'main', extname: "hbs"}));
app.set('view engine', 'hbs');
// static files middleware
app.use('/public', express.static(path.join(__dirname, 'public')))

// OUR MOCK ARRAY OF LOAD INFO
let loadReview = [
    { thirdPartyLoadInfo: Object, loadNum: "02467", waitTime: "30", loadWeight: "200", safety: "No Lights", otherComments: "None" },
    { thirdPartyLoadInfo: Object, loadNum: "26510", waitTime: "50", loadWeight: "600", safety: "Lights", otherComments: "I like this."}
]

// ROOT ROUTE
app.get('/', (req, res) => {
    res.render('review-form');
})


app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
