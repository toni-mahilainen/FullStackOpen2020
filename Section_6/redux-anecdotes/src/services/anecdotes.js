import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (content) => {
    const anecdoteObj = {
        content: content,
        votes: 0
    }
    const response = await axios.post(baseUrl, anecdoteObj)
    return response.data
}

const update = async (id, anecdoteObj) => {
    const response = await axios.put(`${baseUrl}/${id}`, anecdoteObj)
    return response.data
}

export default { getAll, create, update }