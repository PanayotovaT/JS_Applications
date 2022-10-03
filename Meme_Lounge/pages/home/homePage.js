import { homeTemplate } from "./homeTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _authService = undefined;

function initialize(router, renderHandler, authService) {
    _router = router;
    _renderHandler = renderHandler;
}

async function getView(context, next) {

    let viewModel = {
        isLoggedIn: context.user !== undefined
    }
    let templateResult = homeTemplate();
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}