let appId ='9e1f6d31dab593653f0f8cef7e0668f4';
let units = 'imperial';
let searchMethod;
var btn = document.querySelector('searchControl');


//function checks to see if the search term is 5 and checks to see if there are 5 numbers.
function getSearchMethod(searchTerm) {
	if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm)
		searchMethod = 'zip';
	 else {
		searchMethod = 'q';
	}
}


	


/*this function uses the object searchTerm which is either going to be a zipcode or q which is a city name based on the weather api doc
APPID is = to the variable where we stored our api key. units is the imperial for F
we then need to use .then because we are waiting for a response from a remote server.
*/
function searchWeather(searchTerm) {
	getSearchMethod(searchTerm);
	fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(result => {
		return result.json();
	}) .then(result => {
		init(result);
	}) 
}
//based on the result display a background
	function init(resultFromServer) {
		switch (resultFromServer.weather[0].main) {
			case 'Clear':
				document.body.style.backgroundImage = 'url("clear.jpeg")';
				break;

			case 'Clouds':
				document.body.style.backgroundImage = 'url("cloudy.jpeg")';

				break;

			case 'Rain':
			case 'Drizzle':
			case 'Mist':
				document.body.style.backgroundImage = 'url("rain.jpeg")';
				break;

			case 'Snow':	
				document.body.style.backgroundImage = 'url("snow.jpeg")';
				break;

			case 'Thunderstorm':
				document.body.style.backgroundImage = 'url("storm.jpeg")';
			
				break;

			default: 
			
				break;					
		}
//this next part captures the rest of the information that the server is returing to us.
		let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
		let temperatureElement = document.getElementById('temperature');
		let humidityElement = document.getElementById('humidity');
		let windSpeedElement = document.getElementById('windSpeed');
		let cityHeader = document.getElementById('cityHeader');
		let weatherIcon = document.getElementById('documentIconImg');
//this part captures the little weather symbol from the api.
		weatherIcon.src='http://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

		let resultDescription = resultFromServer.weather[0].description;
		weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

		temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176' + 'F ';
		windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' mph';
		cityHeader.innerHTML = resultFromServer.name;
		humidityElement.innerHTML = 'humidity levels at ' + resultFromServer.main.humidity + '%';

		setPositionForWeatherInfo();
	}

	function setPositionForWeatherInfo() {
		let weatherContainer = document.getElementById('weatherContainer');
		let weatherContainerHeight = weatherContainer.clientHeight;
		let weatherContainerWidth = weatherContainer.clientWidth;

		weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
		weatherContainer.style.top  = `calc(50% - ${weatherContainerHeight / 1.3}px)`;
		weatherContainer.style.visibility = 'visible';
	}


//this next line captures the input from the data that the user enters. If searchterm exists call the function searchWeather.
	document.getElementById('searchBtn').addEventListener('click', () => {
		let searchTerm = document.getElementById('searchInput').value;
		if(searchTerm) {
			searchWeather(searchTerm);
		}

		else {
			alert('no data entered!');

		}
		
	})

