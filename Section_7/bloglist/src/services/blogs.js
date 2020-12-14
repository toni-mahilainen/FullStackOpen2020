import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const create = async (blogInfo) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, blogInfo, config)
    return response.data
}

const update = async (id, blogInfo) => {
    const response = await axios.put(`${baseUrl}/${id}`, blogInfo)
    return response.data
}

const remove = async (id) => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.status
}

const exports = { getAll, create, update, remove, setToken }

export default exports