import OneValueCache from '../helpers/OneValueCache'
import { generateProductInfo } from './generateProductInfo'
import { ProductInfo } from './models/ProductInfo'
import { postPhotoToInstagram } from './postPhotoToInstagram'

class PostService {
  public static productInfoCache: OneValueCache<ProductInfo> =
    new OneValueCache()
  public static selectedProductIds = new Set<number>()
  private requestId: string

  constructor(requestId: string) {
    this.requestId = requestId
  }

  public async generateProductInfo(): Promise<ProductInfo> {
    return generateProductInfo(this.requestId)
  }

  public async postPhotoToInstagram(productInfo: ProductInfo) {
    return postPhotoToInstagram(productInfo, this.requestId)
  }
}

export default PostService
