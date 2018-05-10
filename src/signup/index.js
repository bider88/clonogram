import page from 'page'
import empty from 'empty-element'
import template from './template'

page('/signup', (ctx, next) => {
    document.title = 'Clonogram -Signup'
    let main = document.getElementById('main-container')
    empty(main).appendChild(template)
})