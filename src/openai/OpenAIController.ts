import { Configuration, OpenAIApi } from 'openai'
import ChatGPT from './chatgpt/ChatGPT'

class OpenAIController {
  private openai: OpenAIApi
  private requestId: string
  public chatGPT: ChatGPT

  constructor(requestId: string) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    })
    this.openai = new OpenAIApi(configuration)

    this.requestId = requestId
    this.chatGPT = new ChatGPT(this.openai, this.requestId)
  }
}

export default OpenAIController
