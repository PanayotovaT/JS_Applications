import { html } from '../../lib.js';


export const profileTemplate = (items, email) => html`
    <section id="profilePage">
        <div class="userInfo">
            <div class="avatar">
                <img src="./images/profilePic.png">
            </div>
            <h2>${email}</h2>
        </div>
        <div class="board">
            <!--If there are event-->
            ${items.length > 0 
                ? items.map(itemTemplate)
                : html`<div class="no-events">
                <p>This user has no events yet!</p>
            </div>`
        }
    
            <!--If there are no event-->
          
        </div>
    </section>`;

const itemTemplate = (item) => html`
    <div class="eventBoard">
        <div class="event-info">
            <img src=${item.imageUrl}>
            <h2>${item.title}</h2>
            <h6>${item.date}</h6>
            <a href="/details/${item._id}" class="details-button">Details</a>
        </div>
    </div>`;