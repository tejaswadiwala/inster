import logger from '../../logger'
// TODO: Uncomment the below
// import OpenAIController from '../../openai/OpenAIController'
// import ChatGPT from '../../openai/chatgpt/ChatGPT'
import ShopifyController from '../../shopify/ShopifyController'
import { GetAllProductsDTO } from '../../shopify/dtos/GetAllProductsDTO'
import { Product } from '../../shopify/models/Product'
import PostService from './PostService'
import { ProductInfo } from './models/ProductInfo'

export const generateProductInfo = async (
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

    let randomProduct: Product | null = null

    while (
      !randomProduct ||
      PostService.selectedProductIds.has(randomProduct.id)
    ) {
      randomProduct = selectRandomProduct(allProducts.products)
    }

    PostService.selectedProductIds.add(randomProduct.id)

    /* TODO: Uncomment below before going live, i.e., once we get permission from Meta
    const prompt: string = ChatGPT.Personas.SocialMediaManager.captionCreator(
      randomProduct.title,
      randomProduct.body_html,
      requestId
    )
    const openaiController: OpenAIController = new OpenAIController(requestId)
    const caption: string = await openaiController.chatGPT.getResponse(prompt)  
    */

    const productInfo: ProductInfo = {
      title: randomProduct.title,
      description: randomProduct.body_html,
      imageUrl: randomProduct.image.src,
      caption: 'Example Caption',
    }

    PostService.productInfoCache.setValue(productInfo)

    logger.info({
      type: type,
      message: `${type}: Successfully completed execution.`,
      requestId: requestId,
      productInfo: productInfo,
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
