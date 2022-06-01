// Personal API Key for OpenWeatherMap API
const apiKey = 'c8d5807618fc610b35e6bad125c0c12b&units=imperial';
const apiBaseUrl = 'https://api.openweathermap.org';

let generateBtn = document.getElementById('generate');
let feelings = document.getElementById('feelings');

// Event listener to add function to existing HTML DOM element

/* Function called by event listener */
generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let zipcode = document.getElementById('zip').value;
    getWeatherData(apiBaseUrl, zipcode, apiKey).then((data) => {
        let date = new Date(data.dt*1000+(data.timezone*1000)).toDateString()
        postProjectData('/post', {
            'temp': data.main.temp,
            'date': date,
            'userResponse': feelings
        })
    }
    );
})

/* Function to GET Web API Data*/
const getWeatherData = async (baseUrl, zip, key) => {
    const response = await fetch(baseUrl + '/data/2.5/weather?zip=' + zip + '&appid=' + key);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.log('error:', error);
    }
}

/* Function to POST data */
const postProjectData = async (urlPath, apiData) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiData),
    });

    try {
        const newPostData = await response.json();
        return newPostData;
    }
    catch (error) {
        console.log("error", error);
    }
}

/* Function to GET Project Data */