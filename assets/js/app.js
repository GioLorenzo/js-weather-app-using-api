window.addEventListener("load", () => {
    let lon;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let weatherIcon = document.querySelector('.weather-icon');
    let temperature = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature-unit');



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            const api = `https://weather.ls.hereapi.com/weather/1.0/report.json?product=observation&metric=true&latitude=${lat}&longitude=${lon}&oneobservation=true&apiKey=a3NeguKdkV2KcEvS2qJJFDtM5v4UFrXqud3FTV1cLN0`;
            const request = `https://api.allorigins.win/get?url=${encodeURIComponent(api)}`;
            
            fetch(request)
                .then((resp) => resp.json())
                .then(function (data) {
                    const info = JSON.parse(data.contents);
                    console.log(info);
                    const temp = info.observations.location[0].observation[0].temperature;
                    const summary = info.observations.location[0].observation[0].description;
                    const iconurl = info.observations.location[0].observation[0].iconLink;
                    //Set DOM elements from the API
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = info.observations.location[0].city;
                    weatherIcon.src = `${iconurl}`;
                    
                    //Change Temp
                    temperature.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                        } else {
                            temperatureSpan.textContent = "F";
                        }
                    })
                })
                .catch(function(error) {
                    console.log(error);
                })  
        });

    } else {
        h5.textContent = "Hey! Your geolocation is not working DX"
    }

});