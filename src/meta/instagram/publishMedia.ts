import { AxiosResponse } from 'axios'
import {
  META_INSTAGRAM_ACCESS_TOKEN,
  META_INSTAGRAM_BUSINESS_ACCOUNT_ID,
} from '../../config'
import Helpers from '../../helpers/Helpers'
import logger from '../../logger'
import { metaAxiosInstance } from '../../meta/metaAuth'

export const publishMedia = async (creationId: string, requestId: string) => {
  const type = 'Instagram.publishMedia'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    const helpers = new Helpers(requestId)
    const endpoint = `/${META_INSTAGRAM_BUSINESS_ACCOUNT_ID}/media_pubish`
    const config = {
      params: {
        creation_id: creationId,
        access_token: META_INSTAGRAM_ACCESS_TOKEN,
      },
    }
    const response: AxiosResponse = await helpers.axiosHelper.postResponse(
      metaAxiosInstance,
      null,
      endpoint,
      config
    )

    logger.info({
      type: type,
      message: `${type}: Successfully completed execution - ${JSON.stringify(
        response.data
      )}.`,
      requestId: requestId,
    })
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
