const url = 'http://localhost:3030/jsonstore/collections/students';


async function loadAll() {
    const tbody = document.querySelector('tbody');
    const data = await getAll();
    const result = Object.values(data).map(student => {
        const res = createRow(student);
        return res;
    }).join('');
    tbody.innerHTML = result;

    Object.values(document.querySelectorAll('.delBtn')).map(x => {
        x.addEventListener('click', async(e) => {
            let id = e.target.parentNode.parentNode.dataset.id;
            let confirmed = confirm('Do you want to delete this item?');

            if(confirmed) {
                deleteItem(id);
            }
        });
    });

    Object.values(document.querySelectorAll('.editBtn')).map(x => {
        x.addEventListener('click', async (e) => {
            let id = e.target.parentNode.parentNode.dataset.id;

            let firstName = document.querySelector('input[name="firstName"]');
            let lastName = document.querySelector('input[name="lastName"]');
            let facultyNumber = document.querySelector('input[name="facultyNumber"]');
            let grade = document.querySelector('input[name="grade"]');

            const button =document.createElement('button');
            button.classList.add('save');
            button.textContent = 'Save';
            document.querySelector('.inputs').appendChild(button);
            let item = await getOne(id);
            firstName.value = item.firstName;
            lastName.value = item.lastName;
            facultyNumber.value = item.facultyNumber;
            grade.value = item.grade;
            
            
            document.querySelector('.save').addEventListener('click', async(e) => {
                let inputs = document.querySelector('.inputs');
                let newItem = {
                   firstName: firstName.value,
                   lastName: lastName.value,
                   facultyNumber: facultyNumber.value,
                   grade: grade.value
                }
                console.log(id);
                await updateItem(id, newItem);
                inputs.removeChild(inputs.lastChild)

            })

            loadAll();
        })
    })
}

loadAll();

document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let firstName = formData.get('firstName');
    let lastName = formData.get('lastName');
    let facultyNumber = formData.get('facultyNumber');
    let grade = formData.get('grade');
    let student = {
        firstName,
        lastName,
        facultyNumber,
        grade
    };

    await createStudent(student);
    form.reset();
    loadAll();

});



async function getAll() {
    const res = await fetch(url);
    if (res.ok !== true) {
        return alert('Error');
    }
    const data = await res.json();
    return data;
}

async function getOne(id) {
    let res = await fetch(`${url}/${id}`);
    return res.json();
}


function createRow(student) {

    const result = `
    <tr data-id="${student._id}">
        <td>${student.firstName}</td>
        <td>${student.lastName}</td>
        <td>${student.facultyNumber}</td>
        <td>${student.grade}</td>
        <td>
            <button class="editBtn">Edit</button>
            <button class="delBtn">Delete</button>
        </td>
    </tr>
    `;
    return result;
}

async function createStudent(student) {
    const res = await fetch(url, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    });

    const result = res.json();

    return result;
}

async function updateItem(id, item) {
    let res = await fetch(`${url}/${id}`, {
        method: 'Put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    });

    return await res.json();
}

async function deleteItem(id) {
    await fetch(`${url}/${id}`, {
        method: 'Delete',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    loadAll();
}