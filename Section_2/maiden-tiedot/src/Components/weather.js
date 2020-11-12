import React from 'react';

const Weather = ({ countryInfo, weather }) => {
    console.log(weather);
    return (
        <div>
            <h2>Weather in {countryInfo.capital}</h2>
            <p>Temperature: {weather.current.temperature} &#8451;</p>
            {weather.current.weather_icons.map(iconSource => <img key={weather.location.name} src={iconSource} alt='Weather icon' width='100px'/>)}
            <p>Wind: {weather.current.wind_speed} mph / Direction: {weather.current.wind_dir}</p>
        </div>
    )
}

export default Weather;