import React, { useState, useEffect } from 'react';
import Countries from './Components/countries'
import Filter from './Components/filter'
import axios from 'axios';

const App = () => {
    const [filter, setFilter] = useState('')
    const [countries, setCountries] = useState([])
    const [filtering, setFiltering] = useState(false)
    const [showCountryInfo, setShowCountryInfo] = useState(false);

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

    const countriesToShow = filtering ? countries.filter(country => country.name.toLowerCase().startsWith(filter.toLowerCase())) : countries
    const bool = showCountryInfo

    return (
        <div>
            <Filter filter={filter} handleCountryChange={handleCountryChange} />
            <Countries countries={countriesToShow} showCountryInfo={bool} setShowCountryInfo={() => setShowCountryInfo(!showCountryInfo)} />
        </div>
    )
}

export default App;
