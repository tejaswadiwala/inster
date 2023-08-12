import express from 'express'
import OpenAIController from './openai/OpenAIController'
import { v4 as uuidv4 } from 'uuid'

const app = express()

app.get('/', (req, res) => {
  const requestId = uuidv4()
  return res.status(200).send({ data: 'ok', requestId: requestId })
})

app.get('/chatGPT/getResponse/:prompt', async (req, res) => {
  const requestId = uuidv4()
  try {
    const prompt: string = req.params.prompt
    const openai: OpenAIController = new OpenAIController(requestId)
    const response = await openai.chatGPT.getResponse(prompt)
    return res.status(200).send({ data: response, requestId: requestId })
  } catch (error) {
    return res.status(500).send({ error: error, requestId: requestId })
  }
})

export default app
