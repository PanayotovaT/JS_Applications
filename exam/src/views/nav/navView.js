import { navTemplate } from './navTemplate.js';
import { isLoggedIn, deleteUserData} from '../../services/auth.js';
import { logout } from '../../services/userServices.js'


export async function navView(ctx, next) {
    console.log('nav');
    const isLogged = isLoggedIn();
    ctx.renderNavigation(navTemplate(isLogged, onLogout));

    async function onLogout() {
       logout();
       deleteUserData()
        ctx.page.redirect('/');
    }

    next();
}