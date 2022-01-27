import { jsonRequest } from "../helpers/httpService.js";
import viewFinder from "../viewFinder.js";

let section = undefined;
function setupSection(domElement) {
    section = domElement;

}

async function getView() {
    let url = 'http://localhost:3030/data/movies';
    let movies = await jsonRequest(url);
    
    let moviesHtml = movies.map(m => createHtmlMovie(m)).join('\n');
    let movieContainer = section.querySelector('#movie-container')
    movieContainer.querySelectorAll('.movie').forEach(el => el.remove());
    movieContainer.innerHTML = moviesHtml;
   
    movieContainer.querySelectorAll('.link')
    .forEach(l => l.addEventListener('click', viewFinder.changeViewHandler));

    return section;
}

let homeMoviePage = {
    setupSection,
    getView
};

function createHtmlMovie(movie) {
    let elem = `<div class="card mb-4 movie">
    <img class="card-img-top" src="${movie.img}"
        alt="Card image cap" width="400">
    <div class="card-body">
        <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
        <a  data-route="movie-details" data-id="${movie._id}" href="#/details/6lOxMFSMkML09wux6sAF" class="link">
            <button type="button" class="btn btn-info">Details</button>
        </a>
    </div>
</div>`;

return elem;
}

export default homeMoviePage;