import { ProductInfo } from '../../services/post/models/ProductInfo'
import { generateProductInfo } from './generateProductInfo'
import { postPhotoToInstagram } from './postPhotoToInstagram'

class Post {
  private requestId: string

  constructor(requestId: string) {
    this.requestId = requestId
  }

  public async generateProductInfo(): Promise<ProductInfo> {
    return generateProductInfo(this.requestId)
  }

  public async postPhotoToInstagram(): Promise<void> {
    return postPhotoToInstagram(this.requestId)
  }
}

export default Post
