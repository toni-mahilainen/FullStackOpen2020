import React from 'react';

const Filter = ({ filter, handleCountryChange }) => {
    return (
        <div>
            <form>
                Find countries: <input value={filter} onChange={handleCountryChange}/>
            </form>
        </div>
    );
}

export default Filter;
