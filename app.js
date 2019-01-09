// Express - defines routes
const express = require('express')
var exphbs = require('express-handlebars');

const app = express()

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// ROOT ROUTE
app.get('/', (req, res) => {
    res.render('home', {msg: 'Handlebars are Cool!'})
})

app.listen(3000, () => {
    console.log('App listening on port 3000!')
})
