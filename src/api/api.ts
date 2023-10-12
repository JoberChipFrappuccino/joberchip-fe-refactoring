import { ACCESS_TOKEN, BACK_MOCK_ACCESS_TOKEN } from '@/constants'
import axios from 'axios'
import { errorController } from './controller/error'

const mockAPI = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? process.env.FRONT_SERVER_BASE_URL : `http://localhost:${process.env.PORT}`,
  timeout: 10000
})

mockAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN) ? localStorage.getItem(ACCESS_TOKEN) : ''
    config.headers.Authorization = token
    return config
  },
  async (error) => {
    if (process.env.NODE_ENV === 'development') console.error(error)
    return await Promise.reject(error)
  }
)

mockAPI.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (process.env.NODE_ENV === 'development') console.error(error)
    await errorController(error)
  }
)

const backAPI = axios.create({
  baseURL: process.env.BACK_SERVER_BASE_URL,
  timeout: 10000
})

backAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(BACK_MOCK_ACCESS_TOKEN) ?? null
    if (token) config.headers.Authorization = token
    return config
  },
  async (error) => {
    if (process.env.NODE_ENV === 'development') console.error(error)
    return await Promise.reject(error)
  }
)

export { mockAPI as authAPI, backAPI as backAuthAPI }
