import { editTemplate } from './editTemplate.js';
import { getOne } from '../../services/data.js';
import { update } from '../../services/data.js'

export async function editView(ctx) {
    const id = ctx.params.id;
    const item = await getOne(id);

    ctx.renderApp(editTemplate(item, onSubmit));

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

        const result  = await update(id, data);
        console.log(result)
        ctx.page.redirect(`/details/${id}`);
        
    }

   
}