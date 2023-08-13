import Helpers from '../helpers/Helpers'
import logger from '../logger'
import { metaAxiosInstance } from './metaAuth'
import { AxiosResponse } from 'axios'

export const getName = async (requestId: string) => {
  const type = 'MetaController.getName'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    const helpers: Helpers = new Helpers(requestId)
    const endpoint = '/me?fields=id,name&transport=cors'

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
