import { generateProductInfo } from './generateProductInfo'
import { ProductInfo } from './models/ProductInfo'

class PostService {
  public static selectedProductIds = new Set<number>()
  private requestId: string

  constructor(requestId: string) {
    this.requestId = requestId
  }

  public async generateProductInfo(): Promise<ProductInfo> {
    return generateProductInfo(this.requestId)
  }
}

export default PostService
