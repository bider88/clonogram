import page from 'page'
import empty from 'empty-element'
import template from './template'
import request from 'superagent'
import header from '../header'
import axios from 'axios'
import spinner from '../spinner'
import webcam from 'webcamjs'
import picture from '../picture-card'

// ctx = contexto

page('/', loading, header, asyncLoadPictures, (ctx, next) => {
    document.title = 'Clonogram'
    let main = document.getElementById('main-container')
    empty(main).appendChild(template(ctx.pictures))

    const picturePreview = $('#picture-preview')
    const cameraInput = $('#camera-input')
    const cancelPicture = $('#cancelPicture')
    const shootButton = $('#shoot')
    const uploadButton = $('#uploadButton')

    function reset() {
        picturePreview.addClass('hide');
        cameraInput.removeClass('hide');
        cancelPicture.addClass('hide');
        shootButton.removeClass('hide');
        uploadButton.addClass('hide');
    }

    cancelPicture.click(reset)

    $('.modal').modal({
        ready: () => {
            webcam.attach('#camera-input')
            shootButton.click(() => {
                webcam.snap( data_uri => {
                    picturePreview.html(`<img src="${data_uri}"/>`)
                    picturePreview.removeClass('hide')
                    cameraInput.addClass('hide')
                    cancelPicture.removeClass('hide')
                    shootButton.addClass('hide')
                    uploadButton.removeClass('hide')
                    uploadButton.off('click')
                    uploadButton.click(()=> {
                        const pic = {
                            url: data_uri,
                            likes: 0,
                            liked: false,
                            createdAt: +new Date(),
                            user: {
                                username: 'bider88',
                                avatar: 'https://graph.facebook.com/v2.10/1703566599738859/picture?type=normal'
                            }
                        }

                        $('#picture-cards').prepend(picture(pic))
                        reset()
                        $('#modalCamera').modal('close');
                    })
                })
            })
        },
        complete: () => {
            webcam.reset()
            reset()
        }
    });
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
