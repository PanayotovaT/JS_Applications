import { profileTemplate } from './profileTemplate.js';
import { getMyItems } from '../../services/data.js'
import { getUserData } from '../../services/auth.js'

export async function profileView(ctx) {

    const userData =  getUserData();
    const userId = userData.userId;
    const email =userData.email;

    const items = await getMyItems(userId);
 

    ctx.renderApp(profileTemplate(items, email))

   
}