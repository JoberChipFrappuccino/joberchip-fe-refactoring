import { ACCESS_TOKEN } from '@/constants'
import axios from 'axios'
import { errorController } from './controller/error'

const authAPI = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? 'http://ec2-34-228-10-85.compute-1.amazonaws.com' : 'http://localhost:5173',
  timeout: 10000
})

authAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN) ? localStorage.getItem(ACCESS_TOKEN) : ''
    config.headers['Content-Type'] = 'application/json; charset=utf-8'
    config.headers['Authorization'] = token
    return config
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

authAPI.interceptors.response.use(
  (res) => res, // todo res.data 하니까 type에러가 남 으잉?
  async (error) => await errorController(error)
)

export { authAPI }
