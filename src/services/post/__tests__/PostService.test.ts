import PostService from '../PostService'
import { generateProductInfo } from '../generateProductInfo'
import { ProductInfo } from '../models/ProductInfo'

jest.mock('../generateProductInfo', () => ({
  generateProductInfo: jest.fn(),
}))

describe('PostService', () => {
  let requestId: string
  let postService: PostService

  beforeEach(() => {
    requestId = 'testRequestId'
    postService = new PostService(requestId)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create an instance of PostService', () => {
    expect(postService).toBeInstanceOf(PostService)
  })

  it('should call generateProductInfo with the provided requestId', async () => {
    await postService.generateProductInfo()

    expect(generateProductInfo).toHaveBeenCalledWith(requestId)
  })

  it('should return the result from generateProductInfo', async () => {
    const expectedProductInfo: ProductInfo = {
      title: 'Test Title',
      description: 'Test Description',
      imageUrl: 'test-image-url.jpg',
      caption: 'Example Caption',
    }
    ;(generateProductInfo as jest.Mock).mockResolvedValue(expectedProductInfo)

    const result = await postService.generateProductInfo()

    expect(result).toEqual(expectedProductInfo)
  })

  it('should add selected product ID to the set', () => {
    const productId = 123
    PostService.selectedProductIds.clear()
    PostService.selectedProductIds.add(productId)

    expect(PostService.selectedProductIds.has(productId)).toBeTruthy()
  })
})
