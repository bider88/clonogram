var express = require('express');
var multer = require('multer');
var ext = require('file-extension');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.' + ext(file.originalname) )
    }
  })
   
var upload = multer({ storage: storage }).single('picture');

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

app.get('/api/pictures', function(req, res) {
    var pictures = [
        {
            user: {
                username: 'bider88',
                avatar: 'https://graph.facebook.com/v2.10/1703566599738859/picture?type=normal'
            },
            url: 'office.jpg',
            likes: 1000001,
            liked: true,
            created_at: new Date().getTime()
        },
        {
            user: {
                username: 'bider88',
                avatar: 'https://graph.facebook.com/v2.10/1703566599738859/picture?type=normal'
            },
            url: 'office.jpg',
            likes: 0,
            liked: false,
            created_at: new Date('2018-05-05').getTime()
        },
    ]

    setTimeout(function() {
        res.send(pictures);
    }, 1000);
});

app.post('/api/pictures', function(req, res) {
    upload(req, res, function(err) {
        if (err) return res.send(500, 'Error uploading file');

        res.send('File uploaded');
    })
})

app.listen(3000, function(err) {
    if (err) return console.log('Hubo un error'), process.exit(1);
    console.log('Clonogram escuchando en el puerto 3000');
})