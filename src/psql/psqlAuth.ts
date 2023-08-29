import { Pool } from 'pg'
import { DATABASE_URL } from '../config'

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Temporary solution to SSL verification issue
  },
})

export default pool
