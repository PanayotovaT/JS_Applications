import { html } from '../../node_modules/lit-html/lit-html.js';
import { getFurniture } from '../data.js';
import { itemTemplate } from './common/item.js'

const dashBoardTemplate = (data) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">
    ${data.map(itemTemplate)}
</div>
`;

export async function createDashboard(ctx) {

    const data = await getFurniture();
    ctx.render(dashBoardTemplate(data))
}