import dotenv from 'dotenv'
dotenv.config()

export const SERVER_PORT = process.env.SERVER_PORT

/* ============== Meta ============== */

/* Meta Credentials */
export const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN
export const META_API_URL = process.env.META_API_URL
export const META_API_VERSION = process.env.META_API_VERSION

/* ============== Open AI ============== */

/* Open AI Credentials */
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY

/* Open AI Settings */
export enum CHAT_GPT_MODEL {
  NAME = 'gpt-3.5-turbo',
}
