import * as carService from '../services/carService.js';

export const renderDeleteCar = (ctx) => {
    const carId = ctx.params.carId;
    carService.del(carId)
        .then(() => {
            ctx.page.redirect('/catalog')
        })
}