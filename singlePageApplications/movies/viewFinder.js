//add data to html so to select links
//add data to html links that keeps info for changing view
// addEventListener to links

import auth from "./helpers/auth.js";
import addMoviePage from "./pages/addMovie.js";
import homeMoviePage from "./pages/home.js";
import loginMoviePage from "./pages/login.js";
import detailsMoviePage from "./pages/movieDetails.js";
import registerMoviePage from "./pages/register.js";

let views = {
    'home': async () => await homeMoviePage.getView(),
    'login': async () => await loginMoviePage.getView(),
    'register': async () => await registerMoviePage.getView(),
    'movie-details': async (id) => await detailsMoviePage.getView(id) ,
    'logout': async () => await auth.logout(),
    'like': async (id) => await detailsMoviePage.like(id),
    'add-movie': async () => await addMoviePage.getView()
};


function initialize(allLinkElements) {

    allLinkElements.forEach(a => a.addEventListener('click', changeViewHandler))
}

export async function changeViewHandler(e) {
    
    let element = e.target.matches('.link')
    ? e.target
    : e.target.closest('.link');
    
    let route = element.dataset.route;
    let id = element.dataset.id;
    navigateTo(route, id);

}
export async function navigateTo(route, id) {
    console.log(route);
    if (views.hasOwnProperty(route)) {
      let view = await views[route](id);
      let appElement = document.getElementById('main');
      appElement.querySelectorAll('.view').forEach(v => v.remove());
      appElement.appendChild(view);
    }
}

export async function redirectTo(route) {
    if(views.hasOwnProperty(route)) {
        let viewFunc = views[route]();
        return viewFunc;
    }
}
let viewFinder = {
    initialize,
    navigateTo,
    changeViewHandler,
    redirectTo
}

export default viewFinder;