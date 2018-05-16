import yo from 'yo-yo'
import layout from '../layout'
import picture from '../picture-card'
import translate from '../translate'
import request from 'superagent'

export default function homepage(pictures) {

    let el = yo`
    <div class="container timeline">
        <div class="row">
            <div class="col s12 m10 offset-m1 l6 offset-l3 center-align">
                <form id="formUpload" enctype="multipart/form-data" class="form-upload" onsubmit=${onsubmit}>
                    <div id="fileName" class="fileUpload btn btn-flat cyan">
                        <span><i class="fa fa-camera" aria-hidden="true"></i> ${translate.message('upload-picture')}</span>
                        <input type="file" name="picture" id="file" class="upload" onchange=${onchange} />
                    </div>
                    <button id="btnUpload" type="submit" class="btn btn-flat cyan hide">${translate.message('upload')}</button>
                    <button id="btnCancel" type="button" class="btn btn-flat red hide" onclick=${cancel}><i class="fa fa-times" aria-hidden="true"></i></button>
                </form>
            </div>
        </div> 
        <div class="row">
            <div class="col s-12 m-10 offset-m1 l6 offset-l3">
                ${ pictures.map((pic) => picture(pic) ) }
            </div>
        </div>
    </div>
    `

    function toggleButtons() {
        document.getElementById('fileName').classList.toggle('hide')
        document.getElementById('btnUpload').classList.toggle('hide')
        document.getElementById('btnCancel').classList.toggle('hide')
    }

    function cancel() {
        toggleButtons()
        document.getElementById('formUpload').reset()
    }

    function onchange() {
        toggleButtons()
    }

    function onsubmit(ev) {
        ev.preventDefault();

        const data = new FormData(this)

        request
            .post('/api/pictures')
            .send(data)
            .end((err, res) => {
                console.log(arguments)
                cancel()
            })
    }

    return layout(el)
}