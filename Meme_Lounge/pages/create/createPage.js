import  { createTemplate } from './createTemplate.js';

let _router = undefined;
let _renderHandler = undefined;
let _memesService = undefined;
let _form = undefined;
let _notifications = undefined;

function initialize(router, renderHandler, memesService, notification) {
  _router = router;
  _renderHandler = renderHandler;
  _memesService = memesService;
  _notifications = notification
}

async function submitHandler(e) {
  e.preventDefault();
  try {
    let formData = new FormData(e.target);
    _form.errorMessages = [];

    let title = formData.get('title');
    if (title.trim() === '') {
      _form.errorMessages.push('Title is required');
    }

    let description = formData.get('description');
    if (description.trim() === '') {
      _form.errorMessages.push('Description is required');
    }

    let imageUrl = formData.get('imageUrl');
    if (imageUrl.trim() === '') {
      _form.errorMessages.push('Image URL is required');
    }

    if (_form.errorMessages.length > 0) {
      let templateResult = createTemplate(_form);
      _notifications.createNotification(_form.errorMessages.join('\n'))
      return _renderHandler(templateResult);
    }
    let meme = {
      title,
      description,
      imageUrl
    };

    let loginResult = await _memesService.create(meme);
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
  let templateResult = createTemplate(_form);

  _renderHandler(templateResult);
}

export default {
  getView,
  initialize,
};
