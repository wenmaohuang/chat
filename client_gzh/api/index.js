import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:3000'
// axios.defaults.baseURL = 'https://www.fyyd.vip'

axios.defaults.baseURL = process.env.BASE_URL
console.log(process.env)


axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default axios