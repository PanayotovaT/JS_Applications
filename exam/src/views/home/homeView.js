import { homeTemplate } from './homeTemplate.js';
import { getAll } from '../../services/data.js'

export async function homeView(ctx) {

    
    const items = await getAll();
    ctx.renderApp(homeTemplate(items));
}