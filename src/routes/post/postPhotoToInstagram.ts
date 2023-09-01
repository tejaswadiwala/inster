import logger from '../../logger'
import PostService from '../../services/post/PostService'
import { ProductInfo } from '../../services/post/models/ProductInfo'

export const postPhotoToInstagram = async (requestId: string) => {
  const type = 'Routes.Post.postPhotoToInstagram'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    let productInfo: ProductInfo | null

    const postService: PostService = new PostService(requestId)
    productInfo = PostService.productInfoCache.getValue()

    if (!productInfo) {
      productInfo = await postService.generateProductInfo()
    }

    await postService.postPhotoToInstagram(productInfo)

    logger.info({
      type: type,
      message: `${type}: Successfully completed execution.`,
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
