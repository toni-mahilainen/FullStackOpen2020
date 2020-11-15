import React, { useState, useEffect } from 'react';
import Countries from './Components/countries'
import Filter from './Components/filter'
import CountryInfo from './Components/countryInfo'
import axios from 'axios';

const App = () => {
    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState([])
    const [filtering, setFiltering] = useState(false)
    const [showCountryInfo, setShowCountryInfo] = useState(false);
    const [country, setCountry] = useState({})

    useEffect(() => {
        axios.get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleCountryChange = (event) => {
        if (event.target.value === '') {
            setFiltering(false)
        } else {
            setFiltering(true)
        }
        setFilter(event.target.value)
    }

    const handleCountryInfo = (event) => {
        const countryName = event.target.parentElement.firstChild.data
        const countryObj = countries.filter(country => country.name.startsWith(countryName)).reduce(country => country)
        setCountry(countryObj)
        setShowCountryInfo(!showCountryInfo)
    }

    const countriesToShow = filtering ? countries.filter(country => country.name.toLowerCase().startsWith(filter.toLowerCase())) : countries

    return (
        <div>
            <Filter filter={filter} handleCountryChange={handleCountryChange} />
            {
                showCountryInfo ?
                    <CountryInfo countryInfo={country} setShowCountryInfo={() => setShowCountryInfo(!showCountryInfo)} /> :
                    <Countries countries={countriesToShow} setShowCountryInfo={handleCountryInfo} />
            }

        </div>
    )
}

export default App;
