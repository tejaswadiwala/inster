import Helpers from '../helpers/Helpers'
import logger from '../logger'
import { metaAxiosInstance } from './metaAuth'
import { AxiosResponse } from 'axios'
import { BasicMetadata } from './models/BasicMetadata'
import {
  META_INSTAGRAM_BUSINESS_ACCOUNT_ID,
  META_LONG_LIVED_ACCESS_TOKEN,
} from '../config'

export const getBasicMetadata = async (
  basicMetadata: BasicMetadata,
  requestId: string
) => {
  const type = 'MetaController.getBasicMetadata'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    const helpers: Helpers = new Helpers(requestId)
    const fields: string[] = []
    Object.keys(basicMetadata.fields).forEach((field) => {
      if (field && basicMetadata.fields[field]) {
        fields.push(field)
      }
    })
    const fieldsString: string = fields.join(',')

    let endpoint
    if (basicMetadata.id) {
      endpoint = `/${META_INSTAGRAM_BUSINESS_ACCOUNT_ID}?fields=${fieldsString}&access_token=${META_LONG_LIVED_ACCESS_TOKEN}`
    } else {
      endpoint = '/me?fields=id,name&transport=cors'
    }

    const response: AxiosResponse = await helpers.axiosHelper.getResponse(
      metaAxiosInstance,
      endpoint
    )

    logger.info({
      type: type,
      message: `${type}: Successfully completed execution - ${JSON.stringify(
        response.data
      )}.`,
      requestId: requestId,
    })
    return response.data
  } catch (error) {
    logger.error({
      type: type,
      message: `${type}: Error occurred.`,
      error: error,
      requestId: requestId,
    })
    throw error
  }
}
