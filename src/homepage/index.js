import page from 'page'
import empty from 'empty-element'
import template from './template'
import request from 'superagent'
import header from '../header'
import axios from 'axios'
import spinner from '../spinner'

// ctx = contexto

page('/', loading, header, asyncLoadPictures, (ctx, next) => {
    document.title = 'Clonogram'
    let main = document.getElementById('main-container')
    empty(main).appendChild(template(ctx.pictures))
})

function loading(ctx, next) {
    // let el = document.createElement('div')
    // el.classList.add('loader')
    // document.getElementById('main-container').appendChild(el)
    document.getElementById('main-container').appendChild(spinner)
    next()   
}

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

function loadPicturesFetch(ctx, next) {
    fetch('api/pictures')
        .then(res => res.json())
        .then( pictures => {
            ctx.pictures = pictures
            next()
        })
        .catch( err => console.log(err))
}

async function asyncLoadPictures(ctx, next) {
    try {
        ctx.pictures = await fetch('/api/pictures').then( res => res.json() )
        next()
    } catch (err) { console.log(err) }
}
