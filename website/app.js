// Personal API Key for OpenWeatherMap API
const apiKey = 'c8d5807618fc610b35e6bad125c0c12b&units=imperial';
const apiBaseUrl = 'https://api.openweathermap.org';

let generateBtn = document.getElementById('generate');

const generateData = (e) => {
    e.preventDefault();

    // Get zipcode from input
    let zipcode = document.getElementById('zip').value;
    // Get feelings from input
    let feelings = document.getElementById('feelings').value;

    // Call getweatherData, i.e the external api
    getWeatherData(apiBaseUrl, zipcode, apiKey).then((data) => {

        // Generate date from weather response data
        let date = new Date(data.dt * 1000 + (data.timezone * 1000)).toDateString()
        // send paramenters to internal post api
        postProjectData('/post', {
            'temp': data.main.temp,
            'date': date,
            'userResponse': feelings
        }).then(() => {
            getAppData("/all");
        })
    }
    );
}

/* Function called by event listener when you click the "Generate" button */
generateBtn.addEventListener('click', generateData);

/* Function to get weather API Data*/
const getWeatherData = async (baseUrl, zip, key) => {
    const response = await fetch(baseUrl + '/data/2.5/weather?zip=' + zip + '&appid=' + key);
    try {
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.log('error:', error);
    }
}

/* Function to POST data */
const postProjectData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
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
const getAppData = async (url = "") => {
    const response = await fetch(url);
    try {
        const data = await response.json();
        updateDOM(data);
    }
    catch (error) {
        console.log('error:', error);
    }
}


/* Function to update the DOM */
const updateDOM = (projectResData) => {
    // Get dom content
    let domDate = document.getElementById('date');
    let domTemp = document.getElementById('temp');
    let domContent = document.getElementById('content');
    // update dom content
    domDate.innerHTML = projectResData.date;
    domTemp.innerHTML = Math.round(projectResData.temp)+ ' degrees';
    domContent.innerHTML = projectResData.userResponse;
}