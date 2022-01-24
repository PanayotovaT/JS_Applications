let loadButton = document.querySelector('main aside .load');
loadButton.addEventListener('click', getCatches);

let catchesContainer = document.getElementById('catches');
catchesContainer.querySelectorAll('.catch').forEach(x => x.remove());
let addForm = document.getElementById('addForm');
let addButton = document .querySelector('#addForm .add');
addButton.disabled = (localStorage.getItem('token') === null);

addForm.addEventListener('click', createCatch);

async function getCatches() {
    let url = 'http://localhost:3030/data/catches';
    let getCatchesResponse = await fetch(url);
    let catches = await getCatchesResponse.json();
    console.log(catches);

    catchesContainer.append(catches.map( c => createHtmlCatch(c)))
}

async function createCatch(e) {
    e.preventDefault();
    let target = e.target;
    if(e.target.tagName == 'BUTTON' && e.target.textContent == 'Add') {
  
        let anglerInput = document.querySelector('#addForm .angler');
        let weightInput = document.querySelector('#addForm .weight');
        let speciesInput = document.querySelector('#addForm .species');
        let locationInput = document.querySelector('#addForm .location');
        let baitInput = document.querySelector('#addForm .bait');
        let captureTimeInput = document.querySelector('#addForm .captureTime');
    
        let newCatch = {
            'angler': anglerInput.value,
            'weight': Number(weightInput.value),
            'species': speciesInput.value,
            'location': locationInput.value,
            'bait': baitInput.value,
            'captureTime': Number(captureTimeInput.value)
        }
        console.log(newCatch)
    
        let token = localStorage.getItem('token');
        console.log(token)
    
        let createResponse = await fetch('http://localhost:3030/data/catches', {
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': token
            },
            method: 'Post',
            body: JSON.stringify(newCatch)
        });
        let createResult = await createResponse.json();
        console.log(createResult);
    }
}
function createHtmlCatch(currCatch) {
    let anglerLable = e('label', undefined, 'Angler');
    let anglerInput = e('input', { type: 'text', class: 'angler' }, currCatch.angler)
    let hr1 = e('hr');
    let weightLabel = e('label', undefined, 'Weight');
    let weightInput = e('input', {type: 'number', class: 'weight'}, currCatch.weight);
    let hr2 = e('hr');
    let speciesLabel = e('label', undefined, 'Species');
    let speciesInput = e('input', {type: 'text', class: 'species'}, currCatch.species);
    let hr3 = e('hr');
    let locationLabel = e('label', undefined, 'Location');
    let locationInput = e('input', {type: 'text', class: 'location'}, currCatch.location);
    let hr4 = e('hr');
    let baitLabel = e('label', undefined, 'Bait');
    let baitInput = e('input', {type: 'text', class: 'bait'}, currCatch.bait);
    let hr5 = e('hr');
    let captureTimeLabel = e('label', undefined, 'Capture Time');
    let captureTimeInput = e('input', {type: 'number', class: 'captureTime'}, currCatch.captureTime);
    let hr6 = e('hr');
    let updateBtn = e('button', {disabled:true, class: 'update'}, 'Update');
    let deleteBtn = e('button', {disabled:true, class: 'delete'}, 'Delete');

    let catchDiv = e('div', {class: 'catch'}, anglerLable, anglerInput, hr1, weightLabel, weightInput, hr2, speciesLabel, speciesInput, hr3, locationLabel, locationInput, hr4, baitLabel, baitInput, hr5, captureTimeLabel, captureTimeInput, hr6, updateBtn, deleteBtn );

    return catchDiv;
}

function e(tag, attributes, ...params) {
    let element = document.createElement(tag);
    let firstValue = params[0];
    if (params.length === 1 && typeof (firstValue) !== 'object') {
        if (['input', 'textarea'].includes(tag)) {
            element.value = firstValue;
        } else {
            element.textContent = firstValue;
        }
    }

    if (attributes !== undefined) {
        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
        })
    }
    return element;
}