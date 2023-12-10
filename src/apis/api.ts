import axios from 'axios'
import { ACCESS_TOKEN, BACK_MOCK_ACCESS_TOKEN } from '@/constants'
import { getAccessToken } from '@/utils'

const mockAPI = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? process.env.FRONT_SERVER_BASE_URL : `http://localhost:${process.env.PORT}`,
  timeout: 10000
})

mockAPI.interceptors.request.use(
  (config) => {
    if (typeof window === 'undefined') return config
    const token = localStorage.getItem(ACCESS_TOKEN) ? localStorage.getItem(ACCESS_TOKEN) : ''
    config.headers.Authorization = token
    return config
  },
  async (error) => {
    if (process.env.NODE_ENV === 'development') console.error(error)
    return await Promise.reject(error)
  }
)

const backAPI = axios.create({
  baseURL: process.env.BACK_SERVER_BASE_URL,
  timeout: 10000
})
const api = axios.create({
  baseURL: process.env.BACK_SERVER_BASE_URL,
  timeout: 10000
})

backAPI.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken(BACK_MOCK_ACCESS_TOKEN)
    if (accessToken) {
      config.headers.Authorization = accessToken
    }
    return config
  },
  async (error) => {
    if (process.env.NODE_ENV === 'development') console.error(error)
    return await Promise.reject(error)
  }
)

export { mockAPI as authAPI, backAPI as backAuthAPI, api }
