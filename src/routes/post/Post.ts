import { ProductInfo } from '../../services/post/models/ProductInfo'
import { generateImage } from './generateImage'

class Post {
  private requestId: string

  constructor(requestId: string) {
    this.requestId = requestId
  }

  public async generateImage(): Promise<ProductInfo> {
    return generateImage(this.requestId)
  }
}

export default Post
