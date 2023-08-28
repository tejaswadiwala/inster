import { Pool } from 'pg'
import {
  PG_DATABASE_USER,
  PG_DATABASE_HOST,
  PG_DATABASE_NAME,
  PG_DATABASE_PASSWORD,
  PG_DATABASE_PORT,
} from '../config'

const pool = new Pool({
  user: PG_DATABASE_USER,
  host: PG_DATABASE_HOST,
  database: PG_DATABASE_NAME,
  password: PG_DATABASE_PASSWORD,
  port: parseInt(PG_DATABASE_PORT as string),
  ssl: {
    rejectUnauthorized: false, // Temporary solution to SSL verification issue
  }
})

export default pool
