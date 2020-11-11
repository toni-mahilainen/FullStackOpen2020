import React from 'react';

const Countries = ({ countries }) => {
    console.log(countries.length);
    if (countries.length > 10) {
        return (
            <div>
                <p>Too many matches, please specify another filter</p>
            </div>
        );
    } else if (countries.length === 1) {
        const countryInfo = countries.reduce(country => country)
        console.log(countryInfo);
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
                    <img src={countryInfo.flag} alt='Flag' width='200px'/>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <ul>
                    {countries.map(country => <li key={country.name}>{country.name}</li>)}
                </ul>
            </div>
        );
    }
}

export default Countries;
