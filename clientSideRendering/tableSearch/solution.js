import {html, render} from '../node_modules/lit-html/lit-html.js';


//start: (executed on app load)
//fetch and parse data
//call update

//update: (executed on search)
//compare student info with search parameter
//interpolate template with data
//render result

//template: (table row)
//populate student info inside row
// display class based on parameter

const rowTemplate = (student, select) => html`
 <tr class=${select ? 'select' : ''}>
                <th>${student.firstName} ${student.lastName}</th>
                <th>${student.email}</th>
                <th>${student.course}</th>
            </tr>`;

const tbody = document.querySelector('tbody');
const input = document.getElementById('searchField');
start();

async function start() {
   document.getElementById('searchBtn').addEventListener('click', () => {
      update(list, input.value);
      // input.value = '';
   })

   const response =  await fetch('http://localhost:3030/jsonstore/advanced/table');
   const data = await response.json();
   const list = Object.values(data);
   console.log(list);

   update(list)
}

function update(list, match = '') {
   const result = list.map(e => rowTemplate(e, compare(e, match)));
   render(result, tbody );
}

function compare(item, match) {
   return Object.values(item).some(v =>match &&  v.toLowerCase().includes(match.toLowerCase()))
}