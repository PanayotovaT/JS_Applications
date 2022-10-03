import authService from "../../services/authService.js";
import { homeTemplate } from "./homeTemplate.js";

let _router = undefined;
let _renderHandler = undefined;

function initialize(router, renderHandler, authService) {
    _router = router;
    _renderHandler = renderHandler;
}

async function getView(context, next) {

    let viewModel = {
        isLoggedIn: context.user !== undefined
    }
    let templateResult = homeTemplate(viewModel);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}