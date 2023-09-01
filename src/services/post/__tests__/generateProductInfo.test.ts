import ShopifyController from '../../../shopify/ShopifyController'
import { generateProductInfo } from '../generateProductInfo'
import product from '../fixtures/product.fixtures'

jest.mock('../../../shopify/ShopifyController')

describe('generateProductInfo', () => {
  it('should generate product info successfully', async () => {
    const mockShopifyController = new ShopifyController(
      'testRequestId'
    ) as jest.Mocked<ShopifyController>
    mockShopifyController.getAllProducts.mockResolvedValue({
      products: [product],
    })
    ;(ShopifyController as jest.Mock).mockReturnValue(mockShopifyController)

    const productInfo = await generateProductInfo('testRequestId')

    expect(productInfo).toEqual({
      title: 'Test Title',
      description: 'Test Description',
      imageUrl: 'main-image-url.jpg',
      caption: 'Example Caption',
    })
  })

  it('should handle errors and throw', async () => {
    const mockShopifyController = new ShopifyController(
      'testRequestId'
    ) as jest.Mocked<ShopifyController>
    mockShopifyController.getAllProducts.mockRejectedValue(
      new Error('Test Error')
    )
    ;(ShopifyController as jest.Mock).mockReturnValue(mockShopifyController)

    await expect(generateProductInfo('testRequestId')).rejects.toThrow(
      'Test Error'
    )
  })
})
