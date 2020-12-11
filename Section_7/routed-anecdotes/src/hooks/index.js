import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    const onReset = (e) => {
        e.preventDefault()
        e.target.content.value = ''
        e.target.author.value = ''
        e.target.info.value = ''
    }

    return {
        type,
        value,
        onChange,
        onReset
    }
}