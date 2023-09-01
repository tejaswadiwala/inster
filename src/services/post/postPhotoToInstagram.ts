import logger, { serializeError } from '../../logger'
import MetaController from '../../meta/MetaController'
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

    const metaController: MetaController = new MetaController(requestId)

    const uploadImageMedia: UploadImageMediaDTO =
      await metaController.instagram.uploadImageMedia(
        productInfo.imageUrl,
        productInfo.caption
      )

    logger.info({
      type: type,
      message: `${type}: Upload Image Media Id - ${uploadImageMedia.id}.`,
      requestId: requestId,
    })

    await metaController.instagram.publishMedia(uploadImageMedia.id)

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
