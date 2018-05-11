if (!window.Intl) {
    window.Intl = require('intl')
    require('intl/locale-data/jsonp/en-US.js')
    require('intl/locale-data/jsonp/es.js')
}

let IntlRelativeFormat = window.IntlRelativeFormat = require('intl-relativeformat')
let IntlMessageFormat = window.IntlMessageFormat = require('intl-messageformat')

require('intl-relativeformat/dist/locale-data/en.js')
require('intl-relativeformat/dist/locale-data/es.js')

let rf = new IntlRelativeFormat('es');

import es from './es'
import en from './en-US'

const MESSAGE ={}

MESSAGE.es = es
MESSAGE['en-US']= en;

const locale = localStorage.locale || 'es'

export default {
    message: (text, opts) => {
        opts = opts || {}
        let msg = new IntlMessageFormat(MESSAGE[locale][text], locale, null)
        return msg.format(opts);
    },
    date: new IntlRelativeFormat(locale)
}
