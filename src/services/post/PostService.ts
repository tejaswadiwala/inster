import { generateImage } from './generateImage'
import { ProductInfo } from './models/ProductInfo'

class PostService {
  private requestId: string

  constructor(requestId: string) {
    this.requestId = requestId
  }

  public async generateImage(): Promise<ProductInfo> {
    return generateImage(this.requestId)
  }
}

export default PostService
