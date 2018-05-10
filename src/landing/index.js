'use strict';

import yo from 'yo-yo'


export default function landing(box) {
    return yo`
    <div class="container">
        <div class="row">
            <div class="col s10 push-s1">
                <div class="row">
                    <div class="col m5 hidden-on-small-only">
                        <img src="iphone.png" class="responsive-img" alt="clonogram">
                    </div>
                    ${box}
                </div>
            </div>
        </div>
    </div>
    `
}
