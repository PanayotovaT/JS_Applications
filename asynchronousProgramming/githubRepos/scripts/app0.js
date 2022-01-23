function loadRepos() {

	const username = document.getElementById('username').value;
	const url = `https://api.github.com/users/${username}/repos`;

	// const requestPromise = fetch(url);
	// console.log(requestPromise)
	// requestPromise.then(handleResponse);

	// function handleResponse(response) {
	// 	console.log(response);
	// 	const dataPromise = response.json();

	// 	dataPromise.then(handleData);
	// }

	// function handleData(data) {
	// 	console.log(data);
	// }
	//-------------------------------------

	// fetch(url).then(response => response.json().then(data => console.log(data)))
	//-------------------------------------
	fetch(url)
		.then(response => {
			if(!response.ok) {
				throw new Error('Request Error')
			}
			console.log(response);
			return  response.json();
		})
			.then(data => {
				console.log('Promise fulfilled');
				console.log(data);
				// const ulElement = document.getElementById('repos');

				// ulElement.innerHTML = '';
				// data.forEach(x =>{
				// 	const liElement =  document.createElement('li');
				// 	liElement.textContent = x.full_name;
				// 	ulElement.appendChild(liElement);
				// })
			})
			.catch(error => {
				console.log('Promise rejected');
				console.log(error);
			})
	
			console.log('After request')

}
loadRepos();