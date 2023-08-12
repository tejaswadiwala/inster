import ChatGPT from './chatgpt/ChatGPT'

class OpenAIController {
  private requestId: string
  public chatGPT: ChatGPT

  constructor(requestId: string) {
    this.requestId = requestId
    this.chatGPT = new ChatGPT(this.requestId)
  }
}

export default OpenAIController
