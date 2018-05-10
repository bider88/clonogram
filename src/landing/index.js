'use strict';

import yo from 'yo-yo'


export default function landing(box) {
    return yo`
    <div class="container landing">
        <div class="row">
            <div class="col s12 m10 push-m1">
                <div class="row">
                    <div class="col m5 hide-on-med-and-down">
                        <img src="iphone.png" class="responsive-img" alt="clonogram">
                    </div>
                    ${box}
                </div>
            </div>
        </div>
    </div>
    `
}
