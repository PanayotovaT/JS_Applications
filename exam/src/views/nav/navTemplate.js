import { html } from '../../lib.js';


export const navTemplate = (isLogged, onLogout) => html`
<nav>
    <a href="/">Theater</a>
    <ul>
        <!--Only users-->
    ${isLogged
        ? userTemplate(onLogout)
        :guestTemplate()}
        <!--Only guest-->

    </ul>
</nav>`;    

const userTemplate = (onLogout) => html`
<li><a href="/profile">Profile</a></li>
<li><a href="/create">Create Event</a></li>
<li><a href="javascript:void(0);" @click=${onLogout}>Logout</a></li>`;
const guestTemplate = () => html`
<li><a href="/login">Login</a></li>
<li><a href="/register">Register</a></li>`;