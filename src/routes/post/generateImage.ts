import logger from '../../logger'
import PostService from '../../services/post/PostService'
import { ProductInfo } from '../../services/post/models/ProductInfo'

export const generateImage = async (
  requestId: string
): Promise<ProductInfo> => {
  const type = 'Routes.Post.generateImage'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    const postService: PostService = new PostService(requestId)
    const productInfo: ProductInfo = await postService.generateImage()

    logger.info({
      type: type,
      message: `${type}: Successfully completed execution.`,
      requestId: requestId,
    })
    return productInfo
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
