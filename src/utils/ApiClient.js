import axios from 'axios'
const ApiClient = axios.create({ baseURL: process.env.REACT_APP_API_URL })
export default ApiClient