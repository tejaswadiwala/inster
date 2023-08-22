import logger from '../../logger'
import ShopifyController from '../../shopify/ShopifyController'
import { ProductInfo } from './models/ProductInfo'

export const generateImage = async (
  requestId: string
): Promise<ProductInfo> => {
  const type = 'PostService.generateImage'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    const shopifyController: ShopifyController = new ShopifyController(
      requestId
    )
    const allProducts: GetAllProductsDTO =
      await shopifyController.getAllProducts()
    const randomProduct = selectRandomProduct(allProducts.products)

    const productInfo: ProductInfo = {
      title: randomProduct.title,
      description: randomProduct.body_html,
      imageUrl: randomProduct.image.src,
    }

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

const selectRandomProduct = (products: Product[]) => {
  const randomIndex = Math.floor(Math.random() * products.length)
  return products[randomIndex]
}
