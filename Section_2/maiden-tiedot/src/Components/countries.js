import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ countryInfo, weather }) => {
    return (
        <div>
            <h2>Weather in {countryInfo.capital}</h2>
            <p>Temperature: {weather.current.temperature} &#8451;</p>
            <img src={weather.current.weather_icons[0]} alt='Weather icon' width='100px' />
            <p>Wind: {weather.current.wind_speed} mph / Direction: {weather.current.wind_dir}</p>
        </div>
    )
}

const CountryInfo = ({ countryInfo }) => {
    const [weather, setWeather] = useState(null);
    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countryInfo.capital}`)
            .then(response => {
                setWeather(response.data)
                console.log(response.data)
            })
    }, [countryInfo])

    return (
        <div>
            <h1>{countryInfo.name}</h1>
            <div>
                <p>Capital: {countryInfo.capital}</p>
                <p>Population: {countryInfo.population}</p>
            </div>
            <div>
                <h2>Languages</h2>
                <ul>
                    {countryInfo.languages.map(language => <li key={language.name}>{language.name}</li>)}
                </ul>
            </div>
            <div>
                <img src={countryInfo.flag} alt='Flag' width='200px' />
            </div>
            {weather ? <Weather countryInfo={countryInfo} weather={weather} /> : null}
        </div>
    )
}

const ShowCountryInfoBtn = () => {
    return (
        <button>
            Show
        </button>
    )
}

const Countries = ({ countries }) => {
    if (countries.length > 10) {
        return (
            <div>
                <p>Too many matches, please specify another filter</p>
            </div>
        );
    } else if (countries.length === 1) {
        const countryInfo = countries.reduce(country => country)
        return (
            <CountryInfo countryInfo={countryInfo} />
        )
    } else {
        return (
            <div>
                <ul>
                    {countries.map(country =>
                        <li key={country.name}>
                            {country.name} <ShowCountryInfoBtn />
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Countries;
