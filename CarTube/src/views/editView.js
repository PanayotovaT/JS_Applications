import { html } from '../../node_modules/lit-html/lit-html.js';
import * as carService from '../services/carService.js';
import { checkCarForm } from '../helpers.js';

const editTemplate = (car, onSubmit) => html`
<section id="edit-listing">
    <div class="container">

        <form id="edit-form" @submit=${onSubmit}>
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" value="${car.brand}">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" value="${car.model}">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" value="${car.description}">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" value="${car.year}">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" value="${car.imageUrl}">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" value="${car.price}">

            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing" >
        </form>
    </div>
</section>
`;

export const renderEditCar = (ctx) => {

    const onSubmit = (e) => {
        e.preventDefault();
        let carId = ctx.params.carId;
        let car = Object.fromEntries(new FormData(e.currentTarget))
        if(!checkCarForm(car)) {
            alert('Please fill in all the fields');
            return;
        }

        car.price = Number(car.price);
        car.year =Number(car.year);

        if(car.price <= 0 || car.year <= 0) {
            return alert('Please insert a positive value!')
        }

        carService.update(carId, car)
            .then(car => {
                ctx.page.redirect(`/cars/${carId}`)
            })
    
    }
    carService.getOne(ctx.params.carId)
        .then(car => {
            // if(car._ownerId != ctx.user._id) {
            //     ctx.page.redirect('/catalog')
            //     return;
            // }
            ctx.render(editTemplate(car, onSubmit))
        } )
}