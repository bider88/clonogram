import page from 'page'
import empty from 'empty-element'
import template from './template'
import request from 'superagent'
import header from '../header'
import axios from 'axios'

// ctx = contexto

page('/', header, loadPicturesAxios, (ctx, next) => {
    document.title = 'Clonogram'
    let main = document.getElementById('main-container')
    empty(main).appendChild(template(ctx.pictures))
})

function loadPictures(ctx, next) {
    request
        .get('/api/pictures')
        .end((err, res) => {
            if (err) return console.log(err);

            ctx.pictures = res.body
            next()
        })
}

function loadPicturesAxios(ctx, next) {
    axios
        .get('/api/pictures')
        .then(res => {
            ctx.pictures = res.data
            next()
        })
        .catch(err => {
            console.log(err);
        })
}
