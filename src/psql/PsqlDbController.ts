import { Pool, QueryResult } from 'pg'
import logger from '../logger'
import { LoginRequestDTO } from '../services/loginRegistration/dtos/LoginRequestDTO'
import { RegistrationRequestDTO } from '../services/loginRegistration/dtos/RegistrationRequestDTO'

enum TABLE {
  NAME = 'inster_user_accounts',
}

class PsqlDbController {
  private pool: Pool
  private requestId: string

  constructor(pool: Pool, requestId: string) {
    this.pool = pool
    this.requestId = requestId
  }

  async executeQuery(
    sqlQueryText: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sqlQueryParams: any
  ): Promise<QueryResult> {
    const client = await this.pool.connect()
    const type = 'PsqlDbController.executeQuery'
    try {
      const result = await client.query(sqlQueryText, sqlQueryParams)
      return result
    } catch (error) {
      logger.error({
        type: type,
        message: `${type}: Error occurred.`,
        error: error,
        requestId: this.requestId,
      })
      throw error
    } finally {
      client.release()
    }
  }

  public async insertUser(
    registrationInformation: RegistrationRequestDTO
  ): Promise<QueryResult> {
    const type = 'PsqlDbController.insertUser'
    try {
      logger.info({
        type: type,
        message: `${type}: Starting now.`,
        requestId: this.requestId,
      })

      const query = `
          INSERT INTO ${TABLE.NAME} (username, password_hash, email)
          VALUES ($1, $2, $3)
        `
      const values = [
        registrationInformation.username,
        registrationInformation.password,
        registrationInformation.email,
      ]
      logger.info({
        type: type,
        message: `${type}: Successfully completed execution.`,
        requestId: this.requestId,
      })
      return this.executeQuery(query, values)
    } catch (error) {
      logger.error({
        type: type,
        message: `${type}: Error occurred.`,
        error: error,
        requestId: this.requestId,
      })
      throw error
    }
  }

  public async authenticateUser(
    loginRequest: LoginRequestDTO
  ): Promise<QueryResult> {
    const type = 'PsqlDbController.authenticateUser'
    try {
      logger.info({
        type: type,
        message: `${type}: Starting now.`,
        requestId: this.requestId,
      })

      const query = `
        SELECT * FROM ${TABLE.NAME} WHERE username = $1
        `
      const values = [loginRequest.username]
      logger.info({
        type: type,
        message: `${type}: Successfully completed execution.`,
        requestId: this.requestId,
      })
      return this.executeQuery(query, values)
    } catch (error) {
      logger.error({
        type: type,
        message: `${type}: Error occurred.`,
        error: error,
        requestId: this.requestId,
      })
      throw error
    }
  }
}

export default PsqlDbController
