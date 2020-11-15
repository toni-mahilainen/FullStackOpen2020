import React from 'react';
import Button from './button';
import CountryInfo from './countryInfo'

const Countries = ({ countries, setShowCountryInfo }) => {
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
                            {country.name} <Button text='Show' onClick={setShowCountryInfo} />
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Countries;
