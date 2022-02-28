import { html, render} from './node_modules/lit-html/lit-html.js';
import { styleMap } from './node_modules/lit-html/directives/style-map.js';

const data = {
    name: 'Alex',
    id: 12,
    phoneNumber: 123456,
    email: 'abc@abv.bg',
    isVisible: false,

}

console.log('hi')
const cardTemplate = (data) => html`
<div class="contact card">
    <div>
        <i class="far fa-user-circle gravatar"></i>
    </div>
    <div class="info">
        <h2>Name: ${data.name}</h2>
        <button class="detailsBtn" @click=${onClick}>Details</button>
        ${messageLink(data.isVisible)}
        <div class="details" id=${data.id} style=${styleMap({display: data.isVisible ? 'block' : 'none'})}>
        <p>Phone number: ${data.phoneNumber}</p>
        <p> Email: ${data.email}</p>
    </div>
    </div>
</div>`;

const messageLink = (isVisible) => isVisible ? html`<a href="javascript:void(0)">Send message</a>` : '';

const main = document.querySelector('main');
render(cardTemplate(data), main);

function onClick() {
   data.isVisible = !data.isVisible;
   render(cardTemplate(data), main)
}