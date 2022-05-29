// Personal API Key for OpenWeatherMap API
const apiKey = 'c8d5807618fc610b35e6bad125c0c12b&units=imperial';
const apiBaseUrl = 'https://api.openweathermap.org';

let generateBtn = document.getElementById('generate');

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */
generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let zipcode = document.getElementById('zip').value;
    getWeatherData(apiBaseUrl, zipcode, apiKey);
})

/* Function to GET Web API Data*/
const getWeatherData = async (baseUrl, zip, key) => {
    const response = await fetch(baseUrl + '/data/2.5/weather?zip=' + zip + '&appid=' + key);
    try {
        const data = await response.json();
        console.log(data)
    }
    catch(error){
        console.log('error:', error);
    }
}

/* Function to POST data */


/* Function to GET Project Data */