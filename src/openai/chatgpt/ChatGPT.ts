import { getResponse } from './getResponse'

class ChatGPT {
  private requestId: string

  constructor(requestId: string) {
    this.requestId = requestId
  }

  public async getResponse(prompt: string) {
    return getResponse(prompt, this.requestId)
  }
}

export default ChatGPT
