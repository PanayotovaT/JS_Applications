import addMoviePage from "./pages/addMovie.js";
import editMoviePage from "./pages/editMovie.js";
import homeMoviePage from "./pages/home.js";
import loginMoviePage from "./pages/login.js";
import detailsMoviePage from "./pages/movieDetails.js";
import registerMoviePage from "./pages/register.js";
import viewFinder from "./viewFinder.js";

await setup();

async function setup() {
    //setup html login
    //setup html register
    //setup html logout?? - only logic
    //setup html homepage
    //setup html add movie
    //setup html moviedetails
    //setup html edit movie
    //setup html likes?? - only logic
    //setup html delete?? - only logic

    let appElement  = document.getElementById('main');

    loginMoviePage.setupSection(document.getElementById('form-login'));
    registerMoviePage.setupSection(document.getElementById('form-sign-up'));
    homeMoviePage.setupSection(document.getElementById('home-page'));
    addMoviePage.setupSection(document.getElementById('add-movie'));
    detailsMoviePage.setupSection(document.getElementById('movie-details'));
    editMoviePage.setupSection(document.getElementById('edit-movie'));
    viewFinder.initialize(document.querySelectorAll('.link'));
    
    
    viewFinder.navigateTo('home')
}
