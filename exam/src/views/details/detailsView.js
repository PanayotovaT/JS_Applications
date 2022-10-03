import { detailsTemplate } from './detailsTemplate.js';
import { getOne, deleteItem} from '../../services/data.js';
import { getUserData, isLoggedIn } from '../../services/auth.js'

export async function detailsView(ctx) {
    const id = ctx.params.id;
    const item = await getOne(id);
    const isLogged = isLoggedIn();
    
    let isOwner = false;

    const userData = getUserData(); 
    if(userData !== undefined) {
       isOwner = userData.userId == item._ownerId;

    }
    ctx.renderApp(detailsTemplate(item, isOwner, onDelete, isLogged));

    async function onDelete() {
        const confirmed = confirm('Do you want to delete this item?');
        if(confirmed) {
            await deleteItem(id);
            ctx.page.redirect('/profile');
        }
    }

   
}