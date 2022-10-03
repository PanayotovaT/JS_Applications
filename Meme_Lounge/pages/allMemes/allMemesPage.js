import { allMemesTemplate } from "./allMemesTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _memesService = undefined;

function initialize(router, renderHandler, memesService) {
    _router = router;
    _renderHandler = renderHandler;
    _memesService = memesService;
}

async function getView(context, next) {

    let allMemes = await _memesService.getAllMemes();

    let templateResult = allMemesTemplate(allMemes);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}