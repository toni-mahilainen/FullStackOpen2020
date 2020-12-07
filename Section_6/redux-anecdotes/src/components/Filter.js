import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = (props) => {
    // const dispatch = useDispatch()

    // const handleChange = (event) => {
    //     const filter = event.target.value
    //     dispatch(filterAnecdotes(filter))
    // }

    const handleChange = (event) => {
        const filter = event.target.value
        props.filterAnecdotes(filter)
    }
    
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input type='text' name='filter' onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        filterAnecdotes: (filter) => {
            dispatch(filterAnecdotes(filter))
        }
    }
}

export default connect(null, mapDispatchToProps)(Filter)
// export default Filter