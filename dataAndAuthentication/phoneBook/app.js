function attachEvents() {

    const url = 'http://localhost:3030/jsonstore/phonebook';

    document.getElementById('btnLoad').addEventListener('click', async () => {
        const phones = document.getElementById('phonebook');
        phones.replaceChildren();
        const phoneData = await getPhones();
        phoneData.map(x => {
            let liElement = document.createElement('li');
            let delEelement = document.createElement('button');
            delEelement.classList.add('delBtn');
            delEelement.textContent = 'DELETE';
            let editEelement = document.createElement('button');
            editEelement.classList.add('editBtn');
            editEelement.textContent = 'Edit';
            liElement.textContent = `${x.person}: ${x.phone}`;
            liElement.setAttribute('data-id', `${x._id}`);
            liElement.appendChild(editEelement);
            liElement.appendChild(delEelement);
            phones.appendChild(liElement);
        });

        const el = document.querySelectorAll('.delBtn');
      
        if(el) {
            Object.values(el).map(e => {
                e.addEventListener('click', async (e) => {
                   let el = e.currentTarget.parentNode;
                   let id = el.dataset.id;
                   
                   await delItem(id);
                });
            })
        };

        const editEl = document.querySelectorAll('.editBtn')
        if(editEl) {
            Object.values(editEl).map(x => {
                x.addEventListener('click', async(e) => {
                    const el = e.currentTarget.parentNode;
                    const id = el.dataset.id;
                    console.log(id);

                    await update(id);

                })
            })
        }
    
    }
    );

    document.getElementById('btnCreate').addEventListener('click', async() => {
        const person = document.getElementById('person').value;
        const phone = document.getElementById('phone').value;

        if(person == '' || phone == '') {
            return alert('All fields are required!');
        }

        await createContact({ person, phone });

        document.getElementById('person').value = '';
        document.getElementById('phone').value = '';
        
    });



        
    async function getPhones() {

        const res = await fetch(url);
        const data = await res.json();
        console.log(data);

        return Object.values(data);
    }

    async function createContact(contact) {

        const res = await fetch(url, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        });

        const data = await res.json();
        console.log(data);
    }

    async function delItem(id) {
        const res = await fetch(`${url}/${id}`, {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();
        console.log(data);
    }

    async function update(id) {
        
    }


}

attachEvents();