// Personal API Key for OpenWeatherMap API
const apiKey = 'c8d5807618fc610b35e6bad125c0c12b&units=imperial';
const apiBaseUrl = 'https://api.openweathermap.org';

let generateBtn = document.getElementById('generate');

/* Function called by event listener when you click the "Generate" button */
generateBtn.addEventListener('click', generateWeatherReport);

const generateWeatherReport = (e) => {
    e.preventDefault();

    // Get zipcode from input
    let userZipcode = document.getElementById('zip').value;
    // Get feelings from input
    let userFeelings = document.getElementById('feelings').value;

    // Call openweatherapi, i.e the external api
    openWeatherData(apiBaseUrl, userZipcode, apiKey).then((data) => {

        // Generate date from weather response data
        let dateValue = new Date(data.dt * 1000 + (data.timezone * 1000)).toDateString()
        // send paramenters to internal post api
        sendUserAndApiData('/post', {
            'temp': data.main.temp,
            'date': dateValue,
            'userResponse': userFeelings
        }).then(() => {
            getAppData("/all");
        })
    }
    );
}

/* Function to get weather API Data*/
const openWeatherData = async (baseUrl, userzip, apikey) => {
    const response = await fetch(`${baseUrl}/data/2.5/weather?zip=${userzip}&appid=${apikey}`);
    try {
        const weatherData = await response.json();
        return weatherData;
    }
    catch (err) {
        console.log(err);
    }
}

/* Function to POST data */
const sendUserAndApiData = async (route, incomingData) => {
    const response = await fetch(route, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(incomingData),
    });

    try {
        const projectData = await response.json();
        return projectData;
    }
    catch (err) {
        console.log(err);
    }
}

/* Function to GET Project Data */
const getAppData = async (route) => {
    const response = await fetch(route);
    try {
        const data = await response.json();
        changeDOMContent(data);
    }
    catch (error) {
        console.log('error:', error);
    }
}


 /* Function to change the DOM  display content*/
const changeDOMContent = (projectResData) => {
    document.getElementById('date').innerHTML = projectResData.date;
    document.getElementById('temp').innerHTML = Math.round(projectResData.temp)+ ' degrees';
    document.getElementById('content').innerHTML = projectResData.userResponse;
}