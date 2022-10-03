import page from '../node_modules/page/page.mjs';

import { authMiddleware } from './middlewares/authMiddleware.js';
import { navigationMiddleware } from './middlewares/navigationMiddleWare.js'
import { renderMiddleware } from './middlewares/renderMiddleware.js'
import { renderCatalog } from './views/allListingsView.js';
import { renderCreate } from './views/createView.js';
import { renderDeleteCar } from './views/deleteCarView.js';
import { renderCarDetails } from './views/detailsCarView.js';
import { renderEditCar } from './views/editView.js';
import { renderHome } from './views/homeView.js';

import { renderLogin } from './views/loginView.js';
import { renderLogout } from './views/logoutView.js';
import { renderMyCarsView } from './views/myCarsView.js';
import { renderRegister } from './views/registerView.js';
import { renderSearch } from './views/searchView.js';

page(authMiddleware);
page(navigationMiddleware);
page(renderMiddleware);

page('/', renderHome);
page('/catalog',renderCatalog );
page('/login', renderLogin);
page('/register', renderRegister);
page('/logout', renderLogout);
page('/listings-by-year', renderSearch);
page('/my-cars', renderMyCarsView);
page('/create', renderCreate);
page('/cars/:carId', renderCarDetails);
page('/cars/:carId/edit', renderEditCar);
page('/cars/:carId/delete', renderDeleteCar);

page.start();