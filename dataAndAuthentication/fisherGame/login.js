let registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', register)
let loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', login)

async function register(e) {

    e.preventDefault();

    let form = e.target;
    let formData  = new FormData(form);
    let password = formData.get('password');
    let repeatPassword = formData.get('rePass');

    if(password !== repeatPassword) {
        console.error('Passwords don\'t match!');
        return;
    }


    let registerUser = {
        email: formData.get('email'),
        password: password
    };

    let registerResponse = await fetch('http://localhost:3030/users/register', {
        headers: { 
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(registerUser)
    });
    let registerResult = await registerResponse.json();
 
    localStorage.setItem('token', registerResult.accessToken);
    location.assign('./index.html')

}

async function login(e) {

    e.preventDefault();

    let form = e.target;
    let formData  = new FormData(form);
    let password = formData.get('password');

    let loginUser = {
        email: formData.get('email'),
        password: password
    }

    let loginResonse = await fetch('http://localhost:3030/users/login', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'Post',
        body: JSON.stringify(loginUser)
    });

    let loginResult = await loginResonse.json();
    localStorage.setItem('token', loginResult.accessToken)

    location.assign('./index.html')
    
}