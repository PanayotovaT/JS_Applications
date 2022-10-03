import { html, nothing } from '../../lib.js';


export const detailsTemplate = (item, isOwner, onDelete, isLogged) => html`
  <section id="detailsPage">
            <div id="detailsBox">
                <div class="detailsInfo">
                    <h1>Title: ${item.title}</h1>
                    <div>
                        <img src=${item.imageUrl} />
                    </div>
                </div>

                <div class="details">
                    <h3>Theater Description</h3>
                    <p>${item.description}</p>
                    <h4>Date: ${item.date}</h4>
                    <h4>Author: ${item.author}</h4>
                    <div class="buttons">
                        ${isOwner ? 
                        html`<a class="btn-delete" href="javascript:void(0);" @click=${onDelete}>Delete</a>
                        <a class="btn-edit" href="/edit/${item._id}">Edit</a>`
                        : html`${isLogged ? html`<a class="btn-like" href="javascript:void(0);">Like</a>` : nothing }`}
                    </div>
                    <p class="likes">Likes: 0</p>
                </div>
            </div>
        </section>
`;