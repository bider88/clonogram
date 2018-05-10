import page from 'page'

page('/', (ctx, next) => {
    document.title= 'Clonogram'
    let main = document.getElementById('main-container')
    
    main.innerHTML = '<a href="/signup">Iniciar sesión</a>'
})
