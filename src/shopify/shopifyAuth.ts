import {
  SHOPIFY_ACCESS_TOKEN,
  SHOPIFY_API_KEY,
  SHOPIFY_API_PASSWORD,
  SHOPIFY_API_VERSION,
  SHOPIFY_SHOP_NAME,
} from '../config'
import axios, { AxiosInstance } from 'axios'

export const shopifyAxiosInstance: AxiosInstance = axios.create({
  baseURL: `https://${SHOPIFY_API_KEY}:${SHOPIFY_API_PASSWORD}@${SHOPIFY_SHOP_NAME}.myshopify.com/admin/api/${SHOPIFY_API_VERSION}`,
  headers: {
    'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
  },
})
