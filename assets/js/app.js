window.addEventListener("load", () => {
    let lon;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let weatherIcon = document.querySelector('.weather-icon');
    let temperature = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.temperature-unit');



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            
            const apiKey = 'wMVeVy93SzcEsGS8lyh5KphDVL8o42iCavSCY_Hw_0A';
            const api = `https://weather.ls.hereapi.com/weather/1.0/report.json?product=observation&metric=true&latitude=${lat}&longitude=${lon}&oneobservation=true&apiKey=${apiKey}`;
            const request = `https://api.allorigins.win/get?url=${encodeURIComponent(api)}`;
            
            fetch(request)
                .then((resp) => resp.json())
                .then(function (data) {
                    const info = JSON.parse(data.contents);
                    console.log(info.observations.location[0].observation);
                    const temp = info.observations.location[0].observation[0].temperature;
                    const summary = info.observations.location[0].observation[0].description;

                    function fahr() {
                        const cels = temp;
                        const conv = (cels * (9 / 5)) + 32;
                        return conv;
                    }

                    //Set DOM elements from the API
                    temperatureDegree.textContent = Math.round(temp);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = info.observations.location[0].city;
                    
                    //Change Temp
                    temperature.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "C") {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = Math.round(fahr());
                        } else {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.round(temp);
                        }
                    })
                })
                .catch(function(error) {
                    console.log(error);
                })  
        });

    } else {
        h5.innerHTML = "Hey! Your geolocation is not working DX"
    }

});

