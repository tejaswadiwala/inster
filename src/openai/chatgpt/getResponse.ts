import logger from '../../logger'
import { openAIConnector } from '../openAIConnector'
import { CHAT_GPT_MODEL } from '../../config'

export const getResponse = async (prompt: string, requestId: string) => {
  const type = 'ChatGPT.getResponse'
  try {
    logger.info({
      type: type,
      message: `${type}: Starting now - ${prompt}.`,
      requestId: requestId,
    })

    // TODO: Change the type of any below
    const response: any = await openAIConnector.createChatCompletion({
      model: CHAT_GPT_MODEL.NAME,
      messages: [{ role: 'user', content: prompt }],
    })

    logger.info({
      type: type,
      message: `${type}: Successfully completed execution.`,
      requestId: requestId,
    })
    logger.info({
      type: type,
      message: response.data.choices[0].message.content,
      requestId: requestId,
    })
    return response.data.choices[0].message.content
  } catch (error) {
    logger.error({
      type: type,
      message: `${type}: Error occurred.`,
      error: error,
      requestId: requestId,
    })
    throw error
  }
}
