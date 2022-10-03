import * as authService from '../services/authService.js';

export function renderLogout(ctx) {
    
    authService.logout(ctx)
        .finally(() => {
            ctx.page.redirect('/');
        })
}