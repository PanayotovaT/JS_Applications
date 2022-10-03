import authService from "../../services/authService.js";
import { navTemplate } from "./navTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _authService = undefined;

function initialize(router, renderHandler, authService) {
    _router = router;
    _renderHandler = renderHandler;
    _authService = authService

}

async function logoutHandler(e) {
    await _authService.logout();
    _router.redirect('/login');

}
async function getView(context, next) {
    let viewModel = {
        isLoggedIn: context.user !== undefined,
        logoutHandler
    }
    let templateResult = navTemplate(viewModel);
    _renderHandler(templateResult);
    next();
}

export default {
    getView,
    initialize
}