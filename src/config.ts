import dotenv from 'dotenv'
dotenv.config()

/* ============== Inster ============== */

export const SERVER_PORT = process.env.SERVER_PORT

/* ============== Meta ============== */

/* Meta Credentials */
export const META_SHORT_LIVED_ACCESS_TOKEN =
  process.env.META_SHORT_LIVED_ACCESS_TOKEN
export const META_LONG_LIVED_ACCESS_TOKEN =
  process.env.META_LONG_LIVED_ACCESS_TOKEN

export const META_API_URL = process.env.META_API_URL
export const META_API_VERSION = process.env.META_API_VERSION

export const META_CLIENT_ID = process.env.META_CLIENT_ID
export const META_CLIENT_SECRET = process.env.META_CLIENT_SECRET

/* Meta -> Instagram Credentials */
export const META_INSTAGRAM_BUSINESS_ACCOUNT_ID =
  process.env.META_INSTAGRAM_BUSINESS_ACCOUNT_ID
export const META_INSTAGRAM_ACCESS_TOKEN =
  process.env.META_INSTAGRAM_ACCESS_TOKEN

/* Meta Enums */
export enum META_GRANT_TYPE {
  FB_EXCHANGE_TOKEN = 'fb_exchange_token',
}

/* ============== Open AI ============== */

/* Open AI Credentials */
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY

/* Open AI Enums */
export enum CHAT_GPT_MODEL {
  NAME = 'gpt-3.5-turbo',
}

/* ============== Shopify ============== */

/* Shopify Credentials */
export const SHOPIFY_SHOP_NAME = process.env.SHOPIFY_SHOP_NAME
export const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY
export const SHOPIFY_API_PASSWORD = process.env.SHOPIFY_API_PASSWORD
export const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION
export const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN

/* Shopify Enums */
export enum SHOPIFY_GET_ALL_PRODUCTS_PARAMS {
  STATUS_ACTIVE = 'active',
}

/* ============== Inster Frontend ============== */

export const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN

/* ============== PostGreSql Database ============== */

export const PG_DATABASE_USER = process.env.PG_DATABASE_USER
export const PG_DATABASE_HOST = process.env.PG_DATABASE_HOST
export const PG_DATABASE_NAME = process.env.PG_DATABASE_NAME
export const PG_DATABASE_PASSWORD = process.env.PG_DATABASE_PASSWORD
export const PG_DATABASE_PORT = process.env.PG_DATABASE_PORT
