import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://13.125.76.45:8080',
  timeout: 10000
})
