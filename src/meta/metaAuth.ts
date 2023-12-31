import axios, { AxiosInstance } from 'axios'
import {
  META_SHORT_LIVED_ACCESS_TOKEN,
  META_API_URL,
  META_API_VERSION,
} from '../config'

export const metaAxiosInstance: AxiosInstance = axios.create({
  baseURL: `${META_API_URL}/${META_API_VERSION}`,
  headers: {
    Authorization: `Bearer ${META_SHORT_LIVED_ACCESS_TOKEN}`,
  },
})
