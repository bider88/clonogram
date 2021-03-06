import yo from 'yo-yo'
import translate from '../translate'
import empty from 'empty-element'

let el = yo `
    <nav class="header">
        <div class="container">
            <div class="row">
                <div class="col s12 m6">
                    <a href="/" class="brand-logo clonogram">Clonogram</a>
                </div>
                <div class="col s2 offset-s9 m6 offset-m6 right-align">
                    <a href="#" class="btn btn-large btn-flat dropdown-button" data-activates="drop-user">
                        <i class="fa fa-user" aria-hidden="true"></i>
                    </a>
                    <ul id="drop-user" class="dropdown-content">
                        <li><a href="/signin">${translate.message('logout')}</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
`

export default function header(ctx, next) {
    const container = document.getElementById('header-container')
    empty(container).appendChild(el)
    next()
}