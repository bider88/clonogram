import page from 'page'
import template from './template'
import empty from 'empty-element'
import header from '../header'

page('/:username', loadUser, header , function(ctx, next) {
    let main = document.getElementById('main-container')
    document.title = `Clonogram - ${ctx.params.username}`
    empty(main).appendChild(template(ctx.user))
});

async function loadUser(ctx, next) {
    try {
        ctx.user = await fetch(`/api/user/${ctx.params.username}`).then(res => res.json())
        next()
    } catch (err) { console.log(err) }
} 