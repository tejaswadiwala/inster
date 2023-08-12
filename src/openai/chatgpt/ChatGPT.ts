import { OpenAIApi } from 'openai'
import logger from '../../logger'

class ChatGPT {
  private openai: OpenAIApi
  private requestId: string

  constructor(openai: OpenAIApi, requestId: string) {
    this.openai = openai
    this.requestId = requestId
  }

  public async getResponse(prompt: string) {
    const type = 'ChatGPT.getResponse'
    try {
      logger.info({
        type: type,
        message: `${type}: Starting now - ${prompt}.`,
        requestId: this.requestId,
      })

      // TODO: Change the type of any below
      const response: any = await this.openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      })

      logger.info({
        type: type,
        message: `${type}: Successfully completed execution.`,
        requestId: this.requestId,
      })
      logger.info({
        response: response.data.choices[0].message.content,
        requestId: this.requestId,
      })
      return response.data.choices[0].message.content
    } catch (error) {
      logger.error({
        type: type,
        message: `${type}: Error occurred.`,
        error: error,
        requestId: this.requestId,
      })
      throw error
    }
  }
}

export default ChatGPT
