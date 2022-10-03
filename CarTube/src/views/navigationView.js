import { html } from '../../node_modules/lit-html/lit-html.js';

const guestUserNavigation = () => html`
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`;

const loggedUserNavigation = (user) => html`
    <div id="profile">
        <a>Welcome ${user.username}</a>
        <a href="/my-cars">My Listings</a>
        <a href="/create">Create Listing</a>
        <a href="/logout">Logout</a>
    </div>`;

const navigationTrmplate = (user) => html`
<nav>
    <a class="active" href="/">Home</a>
    <a href="/catalog">All Listings</a>
    <a href="/listings-by-year">By Year</a>
    <!-- Guest users -->
    ${user ? loggedUserNavigation(user)
    : guestUserNavigation(user)}
    <!-- Logged users -->

</nav>`;

export const renderNavigation = ({user})  => {
 //TODO : add guest and private navigations
 
    return navigationTrmplate(user);
}