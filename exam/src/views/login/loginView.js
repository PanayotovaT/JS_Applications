import { loginTemplate } from './loginTemplate.js';
import { login } from '../../services/userServices.js';

export async function loginView(ctx) {
    console.log('login');


    async function onLogin(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if(email == '' || password == '') {
           return alert('Please insert all fields!');
        }

        const result = await login(email, password);
        ctx.page.redirect('/')

    }

    ctx.renderApp(loginTemplate(onLogin));
   
}