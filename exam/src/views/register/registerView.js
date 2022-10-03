import { registerTemplate } from './registerTemplate.js';
import { register } from '../../services/userServices.js';

export async function registerView(ctx) {
    console.log('register');
    ctx.renderApp(registerTemplate(onSubmit));

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repeatPassword = formData.get('repeatPassword').trim();
  

        if(email == '' || password == '' || repeatPassword == '' ) {
           return alert('Please insert all fields!');
        } 

        if(password !== repeatPassword) {
            return alert('Passwords do not match!')
        }

        const result = await register(email, password);

        ctx.page.redirect('/');

    }
}

   
