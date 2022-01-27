import { jsonRequest} from '../helpers/httpService.js';
import { setAuthToken, setUserId} from '../helpers/auth.js';
import { navigateTo } from '../viewFinder.js';
let section = undefined;

function setupSection(domElement) {

    section = domElement;
    let form = section.querySelector('#register-form');
    form.addEventListener('submit', registerUser);
    

}

async function getView() {
    return section;
}

async function registerUser(e) {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);
    
    let user = {
        email: formData.get('email'),
        password: formData.get('password')
    }
    let email = formData.get('email');
    let password = formData.get('password');
    let repass = formData.get('repeatPassword');
    if(email === '' ||
    password === '' ||
    password.length < 6 ||
    password !== repass
    ) {
        alert('Fields must not be empty and passwords must match!');

    }

    let url = 'http://localhost:3030/users/register';
    let result  = await jsonRequest(url, 'Post', user );
    console.log(result);
    setAuthToken(result.accessToken);
    setUserId(result._id);
    navigateTo('home');
}

let registerMoviePage = {
    setupSection,
    getView
};

export default registerMoviePage;