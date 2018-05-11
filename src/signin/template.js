'use strict';

import yo from 'yo-yo'
import landing from '../landing'
import translate from '../translate'

let signinForm =  yo`
    <div class="col s12 m12 l7">
        <div class="row">
            <div class="signup-box">
                <h1 class="clonogram">
                    Clonogram
                </h1>
                <form class="signup-form">
                    <div class="section">
                        <a href="" class="btn btn-fb hide-on-med-and-down">${translate.message('signup.facebook')}</a>
                        <a href="" class="btn btn-fb hide-on-large-only"><i class="fa fa-facebook-official"></i> ${translate.message('signup.text')}</a>
                    </div>
                    <div class="divider"></div>
                    <div class="section">
                        <input type="text" name="username" placeholder="${translate.message('username')}" />
                        <input type="password" name="password" placeholder="${translate.message('password')}" />
                        <button class="btn waves-effect waves-light btn-signup" type="submit">${translate.message('signup.text')}</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="login-box">
                ${translate.message('signup.have-account')} <a href="/signup">${translate.message('signup.call-to-action')}</a>
            </div>
        </div>
    </div>
    `;

export default landing(signinForm)