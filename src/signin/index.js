import page from 'page'
import empty from 'empty-element'
import template from './template'

page('/signin', (ctx, next) => {
    document.title = 'Clonogram -Signin'
    let main = document.getElementById('main-container')
    empty(main).appendChild(template)
})