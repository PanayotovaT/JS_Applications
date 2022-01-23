function attachEvents() {
    document.getElementById('submit').addEventListener('click', getWeather);
}

attachEvents();

async function getWeather() {
 
    const forcastDiv = document.getElementById('forecast');
    const currentDiv = document.getElementById('current');

    const upcomingDiv = document.getElementById('upcoming');

    //get forecast
    const input = document.getElementById('location');
    const cityName = input.value;

    const code = await getCode(cityName);

    const [current, upcoming] = await Promise.all([getCurrent(code), getUpcoming(code)]);
    console.log(current);
    console.log(upcoming);

    const weather = {

    // Degrees &#176;   // °
    sunny: '&#x2600;',
    'partly sunny': '&#x26C5;',
    overcast: '&#x2601;',
    rain: '&#x2614;',



}
forcastDiv.style.display = '';

const divForcasts = document.createElement('div');
divForcasts.className = 'forcasts';
if(divForcasts !== null) {
    divForcasts.innerHTML = '';
}
const spanSymbol = document.createElement('span');

spanSymbol.className = 'condition symbol';
const symbol = current.forecast.condition.toLowerCase();
spanSymbol.innerHTML = weather[symbol];
const spans = document.createElement('span');
spans.className = 'condition';

const spanLocation = document.createElement('span')
spanLocation.className = 'forecast-data';
spanLocation.textContent = current.name;


const spanDegree = document.createElement('span');
spanDegree.className = 'forecast-data';
spanDegree.textContent = `${current.forecast.low}` + String.fromCharCode(176) + `\ ${current.forecast.high}` + String.fromCharCode(176);

const spanCondition = document.createElement('span')
spanCondition.className = 'forecast-data';
spanCondition.textContent = current.forecast.condition;

spans.appendChild(spanLocation);
spans.appendChild(spanDegree);
spans.appendChild(spanCondition);
divForcasts.appendChild(spanSymbol);
divForcasts.appendChild(spans);
currentDiv.appendChild(divForcasts);


    




}

async function getCode(cityName) {
    //get list of cities
    //find city code b matching city name
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';
    const response = await fetch(url);
    const data = await response.json();

    return data.find(x => x.name.toLowerCase() == cityName.toLowerCase()).code;

}

async function getCurrent(code) {
    //get current condition by code
    const url = 'http://localhost:3030/jsonstore/forecaster/today/' + code;
    const response = await fetch(url);
    const data = await response.json();

    return data;
}


async function getUpcoming(code) {
    //get upcoming forecast;
    const url = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + code;
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

