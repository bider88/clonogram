import yo from 'yo-yo'

if (!window.Intl) {
    window.Intl = require('intl')
    require('intl/locale-data/jsonp/en-US.js')
    require('intl/locale-data/jsonp/es.js')
}

let IntlRelativeFormat = window.IntlRelativeFormat = require('intl-relativeformat')
require('intl-relativeformat/dist/locale-data/en.js')
require('intl-relativeformat/dist/locale-data/es.js')

let rf = new IntlRelativeFormat('es');

export default function(pic) {

    let el;

    function render(picture) {

        return yo `
            <div class="card ${picture.liked ? 'liked' : ''}">
                <div class="card-image">
                    <img class="activator" src="${picture.url}">
                </div>
                <div class="card-content">
                    <a href="/user/${picture.user.username}" class="card-title title-card">
                        <img src="${picture.user.avatar}" class="circle responsive-img avatar" />
                        <span class="username">${picture.user.username}</span>
                    </a>
                    <small class="right time">${rf.format(picture.created_at)}</small>
                    <p>
                        <a class="left" href="#" onclick="${like.bind(null, true)}"><i class="fa fa-heart-o"></i></a>
                        <a class="left" href="#" onclick="${like.bind(null, false)}"><i class="fa fa-heart"></i></a>
                        <span class="left likes"> ${picture.likes} me gustas</span>
                    </p>
                </div>
            </div>
        `
    }

    function like (liked) {
        pic.liked = liked
        pic.likes += liked ? 1 : -1
        let newEl = render(pic)
        yo.update(el, newEl)

        return false
    }

    el = render(pic)

    return el
} 