import { publishMedia } from './publishMedia'
import { uploadImageMedia } from './uploadImageMedia'

class Instagram {
  private requestId: string

  constructor(requestId: string) {
    this.requestId = requestId
  }

  public async uploadImageMedia(
    imageURL: string,
    caption: string
  ): Promise<UploadImageMediaDTO> {
    return uploadImageMedia(imageURL, caption, this.requestId)
  }

  public async publishMedia(creationId: string) {
    return publishMedia(creationId, this.requestId)
  }
}

export default Instagram
