var express = require('express');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

// app.get([ '/', '/signup', '/signin' ], function(req, res) {
//     res.render('index', {  })
// })

app.get('/', function(req, res) {
    res.render('index', { title: 'Clonogram' })
})

app.get('/signup', function(req, res) {
    res.render('index', { title: 'Clonogram - signup' })
})

app.get('/signin', function(req, res) {
    res.render('index', { title: 'Clonogram - signin' })
})

app.listen(3000, function(err) {
    if (err) return console.log('Hubo un error'), process.exit(1);
    console.log('Clonogram escuchando en el puerto 3000');
})