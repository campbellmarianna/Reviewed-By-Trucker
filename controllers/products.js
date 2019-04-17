module.exports = function(app, load) {
    app.get('/io-homepage', (req, res) => {
        res.render('io-homepage');
    });

    app.get('/io-auth', (req, res) => {
        res.render('io-auth');
    });

    app.get('/io-login', (req, res) => {
        res.render('io-login');
    });

    app.get('/io-signup', (req, res) => {
        res.render('io-signup');
    });
}
