window.addEventListener("load", () => {
    let lon;
    let lat;
   

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=32fda7a84639431bdb4b09d1e72a1f34`;

            fetch(api)
                .then(response => {
                    return response.json('');
                })
                .then(data => {
                    console.log(data);
                    const temp = data.main.temp;
                    const summary = data.weather[0].description;
                });
            
        });

    } else {
        h5.textContent = "Hey! Your geolocation is not working DX"
    }

});