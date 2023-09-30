import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.BACK_SERVER_BASE_URL,
  timeout: 10000
})
