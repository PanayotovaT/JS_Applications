import { createTemplate } from './createTemplate.js';
import { create } from '../../services/data.js'

export async function createView(ctx) {
   ctx.renderApp(createTemplate(onSubmit))
   

    async function onSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);

        const title= formData.get('title');
        const date= formData.get('date');
        const author= formData.get('author');
        const description= formData.get('description');
        const imageUrl= formData.get('imageUrl');

        if(title == '' || date == '' || author == '' || description == '' ||imageUrl == ''){
            return alert('All fields should be filled in');
        }

        const data = {
            title,
            date,
            author,
            description,
            imageUrl
        }
        console.log(data)

        const result  = await create(data);
        console.log(result)
        ctx.page.redirect('/');
    }
   
}