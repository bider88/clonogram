import page from 'page'
import empty from 'empty-element'
import template from './template'

page('/', (ctx, next) => {
    document.title = 'Clonogram'
    let main = document.getElementById('main-container')

    const pictures = [
        {
            user: {
                username: 'bider88',
                avatar: 'https://graph.facebook.com/v2.10/1703566599738859/picture?type=normal'
            },
            url: 'office.jpg',
            likes: 1000000,
            liked: true,
            created_at: new Date()
        },
        {
            user: {
                username: 'bider88',
                avatar: 'https://graph.facebook.com/v2.10/1703566599738859/picture?type=normal'
            },
            url: 'office.jpg',
            likes: 0,
            liked: false,
            created_at: new Date('2018-05-05')
        },
    ]

    empty(main).appendChild(template(pictures))
})
