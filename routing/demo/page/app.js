import page from '//unpkg.com/page/page.mjs';


const pages = {
    '/home': '<h2>Home Page</h2><p>Home Page Content</p>',
    '/catalog': '<h2>Catalog Page</h2><p>List of recent articles <a href="/catalog/action/123">Item 123</a></p>',
    '/about': '<h2>About us</h2><p>Contact information</p>',
    '/buy': '<h2>Thank you for your purchase!</h2>'
}
const defaultPage = '<h2>404</h2><p>Page not found</p>'

const main = document.querySelector('main');

page('/home', updateContent)
page('/catalog', updateContent)
page('/catalog/:category/:id', itemDetails)
page('/about', updateContent);

page.redirect('/', '/home')
page.start()

async function updateContent(context) {
    console.log(context);
    main.innerHTML = '<p>Loading...</p>';
    await new Promise(r => setTimeout(r, 1500));
    
    main.innerHTML = pages[context.pathname] || defaultPage;
}

function itemDetails(context) {
    console.log(context)
    const category = context.params.category;
    const id = context.params.id;
    const html = `<h2>Category ${category}</h2>
                <h3>ITem ${id}</h3>
                <p> Details for item ${id}</p>`;
    main.innerHTML = html;

    const btn = document.createElement('button');
    btn.textContent = 'Buy';
    btn.addEventListener('click', () => {
        console.log('called')
        context.page.redirect('/buy');
    });
    main.appendChild(btn)
}