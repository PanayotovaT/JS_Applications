import {page } from './lib.js';
import {initializeDomElement, decorateContext} from './services/renderer.js';
import {login, register, logout} from './services/userServices.js'
import { createView } from './views/create/createView.js';
import { detailsView } from './views/details/detailsView.js';
import { editView } from './views/edit/editView.js';
import { homeView } from './views/home/homeView.js';
import { loginView } from './views/login/loginView.js';
import { navView } from './views/nav/navView.js';
import { profileView } from './views/profile/profileView.js';
import { registerView } from './views/register/registerView.js';



const navElement = document.querySelector('header');
const appElement = document.querySelector('main');

initializeDomElement(navElement, appElement);

page(decorateContext);
page(navView);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/profile', profileView);


page.start();

window.api = {
    login,
    register,
    logout
}