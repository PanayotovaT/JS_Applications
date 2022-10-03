import { registerTemplate } from "./registerTemplate.js";
import authService from "../../services/authService.js";


let _router = undefined;
let _renderHandler = undefined;
let _authService = undefined;
let _form = undefined;
let _notifications = undefined;

function initialize(router, renderHandler, authService, notification) {
    _router = router;
    _renderHandler  = renderHandler;
    _authService = authService;
    _notifications = notification;
}

async function submitHandler(e) {
    e.preventDefault();
    try {
      let formData = new FormData(e.target);
      _form.errorMessages = [];
  
      let email = formData.get('email');
      if (email.trim() === '') {
        _form.errorMessages.push('Email is required');
      }
  
      let password = formData.get('password');
      if (password.trim() === '') {
        _form.errorMessages.push('Password is required');
      }

      let username = formData.get('username');
      if (username.trim() === '') {
        _form.errorMessages.push('Username is required');
      }

      let repeatPassword = formData.get('repeatPass');
      if (repeatPassword.trim() === '') {
        _form.errorMessages.push('Repeat Password field is required');
      }

      let gender = formData.get('gender');
      if (gender === '') {
        _form.errorMessages.push('Gender field is required');
      }
      
      if(password !== repeatPassword) {

        _form.errorMessages.push(`Password\'s don\'t match!`)
      }
      if (_form.errorMessages.length > 0) {
        let templateResult = registerTemplate(_form);
        _notifications.createNotification(_form.errorMessages.join(`\n`));
        return _renderHandler(templateResult);
      }
      let user = {
        email,
        password,
        username,
        gender
      };
  
      await _authService.register(user);
      _router.redirect('/all-memes');
    } catch (err) {
      _notifications.createNotification(err.message)
    }
  }
  async function getView(context) {
    _form = {
      submitHandler,
      errorMessages: [],
    };
    let templateResult = registerTemplate(_form);
  
    return _renderHandler(templateResult);
  }
  
  export default {
    getView,
    initialize,
  };
  