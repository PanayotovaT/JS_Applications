import { render } from '../lib.js';

let navElement = undefined;
let rootElement = undefined;

export const initializeDomElement = (navDomElement, rootDomElement) => {
    navElement = navDomElement;
    rootElement = rootDomElement;
}

export const renderNavigation = (template) => {
   return render(template, navElement)
}

export const renderApp = (template) => {
    return render(template, rootElement)
}

export function decorateContext(context, next) {
    context.renderNavigation = renderNavigation;
    context.renderApp = renderApp;

    next();
}
