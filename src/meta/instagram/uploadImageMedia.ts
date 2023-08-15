import { AxiosResponse } from 'axios'
import {
  META_INSTAGRAM_BUSINESS_ACCOUNT_ID,
  META_LONG_LIVED_ACCESS_TOKEN,
} from '../../config'
import Helpers from '../../helpers/Helpers'
import logger from '../../logger'
import { metaAxiosInstance } from '../metaAuth'

export const uploadImageMedia = async (
  imageURL: string,
  caption: string,
  requestId: string
): Promise<UploadImageMediaDTO> => {
  const type = 'Instagram.uploadImageMedia'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    const helpers = new Helpers(requestId)
    const endpoint = `/${META_INSTAGRAM_BUSINESS_ACCOUNT_ID}/media`
    const config = {
      params: {
        image_url: imageURL,
        caption: caption,
        access_token: META_LONG_LIVED_ACCESS_TOKEN,
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
