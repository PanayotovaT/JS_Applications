import { loginTemplate } from "./loginTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _authService = undefined;
let _form = undefined;
let _notifications = undefined;

function initialize(router, renderHandler, authService, notification) {
  _router = router;
  _renderHandler = renderHandler;
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

    if (_form.errorMessages.length > 0) {
      let templateResult = loginTemplate(_form);
      // alert(_form.errorMessages.join('\n'));
      _form.errorMessages.forEach(x => _notifications.createNotification(x));
      // _notifications.createNotification(_form.errorMessages.join(`\n`))
      return _renderHandler(templateResult);
    }
    let user = {
      email,
      password
    };

    let loginResult = await _authService.login(user);
    _router.redirect('/all-memes');
  } catch (err) {
    console.log(err.message)
    _notifications.createNotification(`Error: ${err.message}`);
  }
}
async function getView(context) {
  _form = {
    submitHandler,
    errorMessages: [],
  };
  let templateResult = loginTemplate(_form);

  return _renderHandler(templateResult);
}

export default {
  getView,
  initialize,
};
