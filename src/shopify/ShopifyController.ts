import { getAllProducts } from './getAllProducts'

class ShopifyController {
  private requestId: string

  constructor(requestId: string) {
    this.requestId = requestId
  }

  public async getAllProducts(): Promise<GetAllProductsDTO> {
    return getAllProducts(this.requestId)
  }
}

export default ShopifyController
