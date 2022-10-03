import { html } from '../../node_modules/lit-html/lit-html.js';
import * as carService from '../services/carService.js';

const createCarTemplate = (onSubmit) => html`
<section id="create-listing">
    <div class="container">
        <form id="create-form" @submit=${onSubmit}>
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>
`;

export const renderCreate = (ctx) => {

    const onSubmit = (e) => {
        e.preventDefault();
        let formData  = new FormData(e.currentTarget);
        //Object.fromEntries(new FormData(e.currentTarget))
        let brand = formData.get('brand').trim();
        let model = formData.get('model').trim();
        let description = formData.get('description').trim();
        let year = Number(formData.get('year').trim());
        let imageUrl = formData.get('imageUrl').trim();
        let price = Number(formData.get('price').trim());

        if(brand == '' || model == '' || description == '' || year == '' || imageUrl == '' || price == '') {
            return alert('Please fill in all the fields')
        }

        if(year == undefined || price == undefined) {
            return alert('Please fill in correct data!')
        }
        let carData = {
            brand,
            model,
            description,
            year,
            imageUrl,
            price
        }
        
        console.log(carData);
        carService.createCar(carData).then(carData => {
            ctx.page.redirect('/catalog');
        })
    }
    ctx.render(createCarTemplate(onSubmit));
}