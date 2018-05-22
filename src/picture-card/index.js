import yo from 'yo-yo'

import translate from '../translate'

export default function(pic) {

    var el;

    function render(picture) {

        return yo `
            <div class="card ${picture.liked ? 'liked' : ''}">
                <div class="card-image">
                    <img class="activator" src="${picture.url}" ondblclick=${like.bind(null, null, true)} />
                    <i class="fa fa-heart like-heart ${picture.likeHeart ? 'liked' : ''}"></i>
                </div>
                <div class="card-content">
                    <a href="/${picture.user.username}" class="card-title title-card">
                        <img src="${picture.user.avatar}" class="circle responsive-img avatar"/>
                        <span class="username">${picture.user.username}</span>
                    </a>
                    <small class="right time">${translate.date.format(picture.created_at)}</small>
                    <p>
                        <a class="left" href="#" onclick="${like.bind(null, true)}"><i class="fa fa-heart-o"></i></a>
                        <a class="left" href="#" onclick="${like.bind(null, false)}"><i class="fa fa-heart"></i></a>
                        <span class="left likes">${translate.message('likes', {likes: picture.likes })}</span>
                    </p>
                </div>
            </div>
        `
    }

    function like(liked, dblclick) {
        if (dblclick) {
            pic.likeHeart = pic.liked = !pic.liked
            liked = pic.liked
        }
        else {
            pic.liked = liked
        }
        pic.likes += liked ? 1 : -1

        function doRender() {
            let newEl = render(pic)
            yo.update(el, newEl)
        }

        doRender()
    
        setTimeout(()=> {
            pic.likeHeart = false
            doRender()
        }, 1500);

        return false
    }

    el = render(pic)

    return el
} 