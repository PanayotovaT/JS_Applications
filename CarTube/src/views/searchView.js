import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as carService from '../services/carService.js';
import { carTemplate } from './sharedTemplates/carTemplate.js';

const searchTemplate = (onSearchChange, onSearchClick, cars=[]) => html`
<section id="search-cars">
    <h1>Filter by year</h1>

    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year" @input=${onSearchChange}>
        <button class="button-list" @click=${onSearchClick}>Search</button>
    </div>

    <h2>Results:</h2>
    <div class="listings">

        <!-- Display all records -->
        ${cars.map(carTemplate)}

        <!-- Display if there are no matches -->
        ${cars.length === 0 ? html`<p class="no-cars"> No results.</p>`
        : nothing }
        
    </div>
</section>
`;

export const renderSearch = (ctx) => {
    let currentSearch = '';

    const onSearchChange = (e) => {
        currentSearch = Number(e.target.value.trim());
    }
    const onSearchClick = (e) => {
        
    carService.getByYear(currentSearch)
        .then(cars => {
            ctx.render(searchTemplate(onSearchChange, onSearchClick, cars));
        })
        
    }
    
    ctx.render(searchTemplate(onSearchChange, onSearchClick));
}
