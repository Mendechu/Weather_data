function start() {

    var country = document.getElementById("searchInput").value;

    var webAddress = `https://api.restcountries.com/countries/v5?q=${country}`;

    fetch(webAddress, {
        headers: {
            'Authorization': 'Bearer rc_live_f15418c093eb4b20a1ad5b60880861bf'
        }
    })

    .then(res => res.json())
    .then(data => moreSteps(data));

}

function moreSteps(data) {

    var oldContent = document.getElementById("showArea");

    oldContent.innerHTML = "";

    var countryData = data.data.objects[0];

    var lat = countryData.capitals[0].coordinates.lat;
    var lng = countryData.capitals[0].coordinates.lng;

    var newDiv = document.createElement("div");

    newDiv.classList.add("country-card");

    newDiv.innerHTML = `

        <img src="${countryData.flag.url_png}">

        <div class="country-info">

            <h2>${countryData.names.common}</h2>

            <p>Capital: ${countryData.capitals[0].name}</p>

            <p>Population: ${countryData.population}</p>

            <p>Region: ${countryData.region}</p>

            <p>Subregion: ${countryData.subregion}</p>

            <button onclick="getWeather(${lat}, ${lng})">
                More Details
            </button>

            <div id="weatherArea"></div>

        </div>
    `;

    oldContent.appendChild(newDiv);
}


function getWeather(lat, lng) {

    console.log("Latitude:", lat);
    console.log("Longitude:", lng);

    var weatherUrl =
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=31d99471b8bb7871ffe2e72693b6ac0f&units=metric`;

    fetch(weatherUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            showWeather(data);
        });

}


function showWeather(data) {

    var weatherArea = document.getElementById("weatherArea");

    document.querySelector(".country-info button").remove();

    weatherArea.innerHTML = `

        <p>Weather: ${data.weather[0].main}</p>

        <p>Description: ${data.weather[0].description}</p>

        <p>Temperature: ${data.main.temp} °C</p>

        <p>Feels like: ${data.main.feels_like} °C</p>

        <p>Wind Speed: ${data.wind.speed} m/s</p>

    `;
}