import logger, { serializeError } from '../../logger'
import { UploadImageMediaDTO } from '../../meta/dtos/UploadImageMediaDTO'
import { publishMedia } from '../../meta/instagram/publishMedia'
import { uploadImageMedia } from '../../meta/instagram/uploadImageMedia'
import PostService from './PostService'
import { ProductInfo } from './models/ProductInfo'

export const postPhotoToInstagram = async (
  productInfo: ProductInfo,
  requestId: string
) => {
  const type = 'PostService.postPhotoToInstagram'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    const uploadImageMediaResponse: UploadImageMediaDTO =
      await uploadImageMedia(
        productInfo.imageUrl,
        productInfo.caption,
        requestId
      )

    logger.info({
      type: type,
      message: `${type}: Upload Image Media Id - ${uploadImageMediaResponse.id}.`,
      requestId: requestId,
    })

    await publishMedia(uploadImageMediaResponse.id, requestId)

    PostService.productInfoCache.clear()

    logger.info({
      type: type,
      message: `${type}: Successfully completed execution.`,
      requestId: requestId,
    })
  } catch (error) {
    logger.error({
      type: type,
      message: `${type}: Error occurred.`,
      error: serializeError(error),
      requestId: requestId,
    })
    throw error
  }
}
