import { ProductInfo } from '../../services/post/models/ProductInfo'
import { generateProductInfo } from './generateProductInfo'

class Post {
  private requestId: string

  constructor(requestId: string) {
    this.requestId = requestId
  }

  public async generateProductInfo(): Promise<ProductInfo> {
    return generateProductInfo(this.requestId)
  }
}

export default Post
