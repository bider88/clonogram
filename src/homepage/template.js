import yo from 'yo-yo'
import layout from '../layout'
import picture from '../picture-card'

export default function homepage(pictures) {

    let el = yo`
    <div class="container timeline"> 
        <div class="row">
            <div class="col s-12 m-10 offset-m1 l6 offset-l3">
                ${ pictures.map((pic) => picture(pic) ) }
            </div>
        </div>
    </div>
    `
    return layout(el)
}