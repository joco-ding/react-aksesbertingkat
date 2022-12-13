import axios from 'axios'
import { baseURL } from './constants'

const { create } = axios

const headers = {
  'Accept': 'application/json'
}

const api = create({
  baseURL,
  headers,
  timeout: 5000
})

export const ApiPost = async (path, data, customheader) => await api.post(path, data, { headers: { ...headers, 'Content-Type': 'application/json', ...customheader } })

export const ApiGet = async (path, customheader) => await api.get(path, { headers: { ...headers, ...customheader } })

