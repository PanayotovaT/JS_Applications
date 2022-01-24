// ВСЕКИ АТРИБУТ, КОЙТО ЗАПОЧВА С DATA- , СМЕ ГО СЪЗДАЛИ НИЕ И МОЖЕ ДА СЪДЪРЖА КАКВОТО СИ ИСКАМЕ
async function request(url, options) {

    const response = await fetch(url, options);
    if (response.ok !== true) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message)
    }
    const data = await response.json();
    return data;
}


//function to load all books fromt the server
//function to create new book
//function to update an existing book using id
//function to delete a book by id

//eventlistener on the load button
//event listener on the create button
//program logic for updating the input form and filling existing values on edit
//program logic to revert the above
//event listener on the delete and edit buttons

//main function : attach event listeners
//-load all books and displa them

async function getAllBooks() {

    const books = await request('http://localhost:3030/jsonstore/collections/books');
    const rows = Object.entries(books).map(createRow).join('');
    document.querySelector('tbody').innerHTML = rows;
    return books;
}

function createRow([id, book]) {
    const result = `
        <tr data-id="${id}">

            <td>${book.title} </td>
            <td>${book.author} </td>
            <td>
                <button class="editBtn">Edit</button>
                <button class="deleteBtn">Delete</button>
            </td>
        </tr>
    `
    return result;
}

async function createBook(event) {

    event.preventDefault();
    const formData = new FormData(event.target);

    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    }
    await request('http://localhost:3030/jsonstore/collections/books', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    })

    event.target.reset();
    getAllBooks();
}

async function updateBook(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const id = formData.get('id');
    const book = {
        title: formData.get('title'),
        author: formData.get('author')
    }

    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });
    document.getElementById('createForm').style.display = 'block';
    document.getElementById('editForm').style.display = 'none';
    event.target.reset();
    getAllBooks();

}

async function deleteBook(id) {
    await request('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete'
    });
    getAllBooks();
}

function start() {

    document.getElementById('loadBooks').addEventListener('click', getAllBooks);
    document.getElementById('createForm').addEventListener('submit', createBook);
    document.getElementById('editForm').addEventListener('submit', updateBook);
    document.querySelector('#editForm [type="button"]').addEventListener('click', (event) => {
        document.getElementById('createForm').style.display = 'block';
        document.getElementById('editForm').style.display = 'none';
        // event.target.reset();
    });
    document.querySelector('table').addEventListener('click', handleTableClick);
   
    getAllBooks();
}
start();

function handleTableClick(event) {
    if (event.target.className == 'editBtn') {
        document.getElementById('createForm').style.display = 'none'
        document.getElementById('editForm').style.display = 'block';
        const bookId = event.target.parentNode.parentNode.dataset.id;
        loadBookForEditing(bookId);
    } else if (event.target.className == 'deleteBtn') {
        const confirmed = confirm('Are you sure you want to delete this book');
        if(confirmed) {
            const bookId = event.target.parentNode.parentNode.dataset.id;
            deleteBook(bookId);

        }
    }
}

async function loadBookForEditing(id) {

    const book = await request('http://localhost:3030/jsonstore/collections/books/' + id);
    document.querySelector('#editForm [name="id"]').value = id;
    document.querySelector('#editForm [name="title"').value = book.title;
    document.querySelector('#editForm [name="author"').value = book.author;
}
