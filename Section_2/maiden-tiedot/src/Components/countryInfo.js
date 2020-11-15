import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Weather from './weather'
import Button from './button';

const CountryInfo = ({ countryInfo, setShowCountryInfo }) => {
    const [weather, setWeather] = useState(null);
    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${countryInfo.capital}`)
            .then(response => {
                setWeather(response.data)
            })
    }, [countryInfo])

    const style = {
        marginTop: '10px'
    }

    return (
        <div>
            <Button text='Back to list' onClick={setShowCountryInfo} style={style}/>
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

export default CountryInfo;