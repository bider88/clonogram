var express = require('express');
var multer = require('multer');
var ext = require('file-extension');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + ext(file.originalname))
    }
})

var upload = multer({ storage: storage }).single('picture');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

// app.get([ '/', '/signup', '/signin' ], function(req, res) {
//     res.render('index', {  })
// })

app.get('/', function (req, res) {
    res.render('index', { title: 'Clonogram' })
})

app.get('/signup', function (req, res) {
    res.render('index', { title: 'Clonogram - signup' })
})

app.get('/signin', function (req, res) {
    res.render('index', { title: 'Clonogram - signin' })
})

app.get('/api/pictures', function (req, res) {
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

    setTimeout(function () {
        res.send(pictures);
    }, 2000);
});

app.post('/api/pictures', function (req, res) {
    upload(req, res, function (err) {
        if (err) return res.send(500, 'Error uploading file');

        res.send('File uploaded');
    })
})

app.get('/api/user/:username', function(req, res) {
    const user = {
        username: 'bider88',
        avatar: 'https://pbs.twimg.com/profile_images/875448111933665280/JyXA8Ims_400x400.jpg',
        pictures: [
            {
                id: 1,
                src: 'https://scontent.fmex7-1.fna.fbcdn.net/v/t1.0-9/33077915_1460008264133131_4048813988597727232_n.jpg?_nc_cat=0&_nc_eui2=AeFmeBHAtwNk8PNe5N9HYr7iLo3xddIUZ_68MyfspEYALZOg8HU5KMa-ibuF5mbIIxm-SQOa3JYsjZG6YcTQ2gB2P2ko1ljRmChx_w24jiqraA&oh=768d98eb63788b3f12be02b8888935c6&oe=5B7C671E',
                likes: 43
            },
            {
                id: 2,
                src: 'https://scontent.fmex7-1.fna.fbcdn.net/v/t1.0-9/33066058_1106015506216794_168669219754344448_n.jpg?_nc_cat=0&_nc_eui2=AeFudMcgoGyMDCaM4AmRSsftwLyZ2xY8zO5A9JNAWIDyhqQGQYK0uvBgXosRMS-eGaQlOBlchrrxaO01pR7mHNKZCh1bXva-RTMZd6LnbRICVQ&oh=f3c6e49f23e7e5ed402e02098ee18eb3&oe=5B881B1C',
                likes: 748
            },
            {
                id: 3,
                src: 'https://scontent.fmex7-1.fna.fbcdn.net/v/t1.0-9/13879472_1753688054856041_7031704999680330241_n.jpg?_nc_cat=0&_nc_eui2=AeEOrULC1DEqvDhJewr1UadnVgLP27YsniMG2gcGhBdd3fo_PF0kU2GfLT3robfLcPdSXz2o7JjNqhnwp7m15DAlAcRybv_Bgme2m0V8559b1w&oh=6c58781c61b262cb7ba1a06574ea159b&oe=5B849B26',
                likes: 102
            },
            {
                id: 4,
                src: 'https://scontent.fmex7-1.fna.fbcdn.net/v/t1.0-9/18425039_1881394968741727_6181315940969136806_n.jpg?_nc_cat=0&_nc_eui2=AeFnsDPAPUMcrf6NWzXN88eq1wZipPB8UhPwU-0THPBDLq_-dXJSYXVX014zgKpmrRysyIHGjv4NPLV7jSaG33I1X1_SvgWDjXnfSt78-rdgQQ&oh=015a66b34b43245c650f0a9139d3268e&oe=5B8110A1',
                likes: 84
            },
            {
                id: 5,
                src: 'https://scontent.fmex7-1.fna.fbcdn.net/v/t1.0-9/16708405_731475490347103_7672139714396364294_n.jpg?_nc_cat=0&_nc_eui2=AeFJU0sbm6wut28UgGBXiIPsO5tyw4tnikCmB9Fqpi5UMZYz5MA5yxXvXfr5ARwdSVKCydqhe5iTuklLro7Bo0QMBEiQaBo_c__cE8LyHi5oyQ&oh=cadbf51f8374483775b6b3f4dcefe2f9&oe=5B8203C7',
                likes: 927368
            }
            ,
            {
                id: 6,
                src: 'https://scontent.fmex7-1.fna.fbcdn.net/v/t1.0-9/31239352_10155930284718248_8871505353326043824_n.jpg?_nc_cat=0&_nc_eui2=AeGOjQeAWu27LicWCyU078xpRWm0MnBgSFfaMDHe_zxzwFx8tgMGG8w5kxUGuiyyBqld6-oTQLnsu8yD_HGmOEmyf5kdOcOosrO2nUXZfSg2QQ&oh=c9ef8232ac6718740a1433ebbf9f6bcf&oe=5B7FA1D2',
                likes: 0
            }
        ]
    }

    res.send(user)
})

app.get('/:username', function (req, res) {
    res.render('index', { title: 'Clonogram - ' + req.params.username })
})

app.get('/:username/:id', function (req, res) {
    res.render('index', { title: 'Clonogram - ' + req.params.username })
})

app.listen(3000, function (err) {
    if (err) return console.log('Hubo un error'), process.exit(1);
    console.log('Clonogram escuchando en el puerto 3000');
})