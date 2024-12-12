const apiKey = '18cec5e4def8bfa29621fd389c3a5cea';

        async function submitForm(event) {
            event.preventDefault();

            const formData = new FormData(document.getElementById('weather-form'));
            const city = formData.get('city');
            const currentTemp = parseFloat(formData.get('current-temp'));
            const currentHumidity = parseFloat(formData.get('current-humidity'));
            const rain = formData.get('rain') ? parseFloat(formData.get('rain')) : 0;
            const windspeed = formData.get('windspeed') ? parseFloat(formData.get('windspeed')) : 0;

            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=2&appid=${apiKey}`;
            console.log(url);

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.cod === "404") {
                    alert("City not found, please enter a valid city name.");
                    return;
                }

                const nextDayForecast = data.list[1];
                const weatherCondition = nextDayForecast.weather[0].description;

                const predictionResult = document.getElementById('prediction-result');
                predictionResult.innerHTML = `
                    <h3 style="color: white; text-align: center;">Weather Condition for ${city} Tomorrow:</h3>
                    <p style="color: white; text-align: center;">${weatherCondition}</p>
                `;
            } catch (error) {
                console.error("Error fetching weather data:", error);
                alert("There was an error fetching the weather data. Please try again later.");
            }
        }
