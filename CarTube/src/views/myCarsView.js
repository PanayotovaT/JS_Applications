import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as carService from '../services/carService.js';
import { carTemplate } from './sharedTemplates/carTemplate.js';


const myCarsTemplate = (cars) => html`
<section id="my-listings">
    <h1>My car listings</h1>
    <div class="listings">

        <!-- Display all records -->
        ${cars.map(carTemplate)}

        <!-- Display if there are no records -->
        ${cars.length === 0 ? html`<p class="no-cars"> You haven't listed any cars yet.</p>`
        : nothing }
        
    </div>
</section>
`;

export const renderMyCarsView = (ctx) => {

    let userId = ctx.user._id;
    carService.getMyCars(userId)
        .then(cars => {
            ctx.render(myCarsTemplate(cars));
        })



}