import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';

import {createPage} from './views/create.js';
import {createDashboard} from './views/dashboard.js';
import {createDetails} from './views/details.js';
import {createEdit} from './views/edit.js';
import { createRegister } from './views/register.js';
import { createLogin } from './views/login.js';
import { myFurniture } from './views/myFurniture.js';

//Tova go polzavhem v nachaloto za da si testavme funkciite
import * as api from './data.js';
window.api = api;

const main = document.querySelector('.container')

page('/', decorateContext, createDashboard);
page('/dashboard', decorateContext, createDashboard);
page('/details/:id', decorateContext,  createDetails);
page('/create', decorateContext,  createPage);
page('/edit/:id', decorateContext, createEdit);
page('/register', decorateContext,  createRegister);
page('/login', decorateContext,  createLogin);
page('/my-furniture', decorateContext,  myFurniture);

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await api.logout();
    setUserNav();
    page.redirect('/');
})

setUserNav();
page.start();

function decorateContext(ctx, next) {

    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next()

}

function setUserNav() {

    const userId = sessionStorage.getItem('userId');
    if(userId != null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}