import {
  META_CLIENT_ID,
  META_CLIENT_SECRET,
  META_GRANT_TYPE,
  META_SHORT_LIVED_ACCESS_TOKEN,
} from '../config'
import Helpers from '../helpers/Helpers'
import logger from '../logger'
import { GetLongLivedTokenDTO } from './dtos/GetLongLivedTokenDTO'
import { metaAxiosInstance } from './metaAuth'
import { AxiosResponse } from 'axios'

export const getLongLivedToken = async (
  requestId: string
): Promise<GetLongLivedTokenDTO> => {
  const type = 'MetaController.getLongLivedToken'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    const helpers: Helpers = new Helpers(requestId)
    const endpoint = '/oauth/access_token'
    const config = {
      params: {
        grant_type: META_GRANT_TYPE.FB_EXCHANGE_TOKEN,
        client_id: META_CLIENT_ID,
        client_secret: META_CLIENT_SECRET,
        fb_exchange_token: META_SHORT_LIVED_ACCESS_TOKEN,
      },
    }

    const response: AxiosResponse = await helpers.axiosHelper.getResponse(
      metaAxiosInstance,
      endpoint,
      config
    )

    logger.info({
      type: type,
      message: `${type}: Successfully completed execution.`,
      requestId: requestId,
      response: response.data,
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
