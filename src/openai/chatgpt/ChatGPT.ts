import { getResponse } from './getResponse'
import { captionCreator } from './personas/socialMediaManager/captionCreator'

class ChatGPT {
  static Personas = {
    SocialMediaManager: {
      captionCreator(
        productTitle: string,
        productDescription: string,
        requestId: string
      ): string {
        return captionCreator(productTitle, productDescription, requestId)
      },
    },
  }

  private requestId: string

  constructor(requestId: string) {
    this.requestId = requestId
  }

  public async getResponse(prompt: string) {
    return getResponse(prompt, this.requestId)
  }
}

export default ChatGPT
