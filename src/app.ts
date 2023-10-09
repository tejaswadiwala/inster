import express from 'express'
import OpenAIController from './openai/OpenAIController'
import { v4 as uuidv4 } from 'uuid'
import Routes from './routes/Routes'
import bodyParser from 'body-parser'
import cors from 'cors'
import { FRONTEND_ORIGIN } from './config'
import { verifyTokenMiddleware } from './middleware/auth'
import { ProductInfo } from './services/post/models/ProductInfo'
import { requestId } from './middleware/requestId'
import Reviews from './routes/reviews/Reviews'
import { RegistrationRequestDTO } from './services/loginRegistration/dtos/RegistrationRequestDTO'
import { LoginRequestDTO } from './services/loginRegistration/dtos/LoginRequestDTO'
import { basicMetadataRoute } from './routes/meta/basicMetadataRoute'

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
  })
)

app.get('/', (req, res) => {
  const requestId = uuidv4()
  return res.status(200).send({ data: 'ok', requestId: requestId })
})

app.get(
  '/chatGPT/getResponse/:prompt',
  verifyTokenMiddleware,
  async (req, res) => {
    const requestId = uuidv4()
    try {
      const prompt: string = req.params.prompt
      const openai: OpenAIController = new OpenAIController(requestId)
      const response = await openai.chatGPT.getResponse(prompt)
      return res.status(200).send({ data: response, requestId: requestId })
    } catch (error) {
      return res.status(500).send({ error: error, requestId: requestId })
    }
  }
)

/* === Post Starts === */
app.get(
  '/post/generateProductInfo',
  verifyTokenMiddleware,
  async (req, res) => {
    const requestId = uuidv4()
    try {
      const routes: Routes = new Routes(requestId)
      const productInfo: ProductInfo = await routes.post.generateProductInfo()
      return res.status(200).send({ data: productInfo, requestId: requestId })
    } catch (error) {
      return res.status(500).send({ error: error, requestId: requestId })
    }
  }
)

app.post(
  '/post/postPhotoToInstagram',
  verifyTokenMiddleware,
  async (req, res) => {
    const requestId = uuidv4()
    try {
      const routes: Routes = new Routes(requestId)
      await routes.post.postPhotoToInstagram()
      return res.status(200).send({ data: 'ok', requestId: requestId })
    } catch (error) {
      return res.status(500).send({ error: error, requestId: requestId })
    }
  }
)

/* === Post Ends === */

/* === Login Registration Starts === */
app.post('/register', async (req, res) => {
  const requestId = uuidv4()
  try {
    const registrationInformation: RegistrationRequestDTO = req.body
    const routes: Routes = new Routes(requestId)
    await routes.loginRegistration.register(registrationInformation)
    return res
      .status(200)
      .send({ data: 'User registered successfully.', requestId: requestId })
  } catch (error) {
    return res.status(500).send({ error: error, requestId: requestId })
  }
})

app.post('/login', async (req, res) => {
  const requestId = uuidv4()
  try {
    const loginRequest: LoginRequestDTO = req.body
    const routes: Routes = new Routes(requestId)
    const response = await routes.loginRegistration.login(loginRequest)
    return res.status(200).send({ data: response, requestId: requestId })
  } catch (error) {
    return res.status(500).send({ error: error, requestId: requestId })
  }
})
/* === Login Registration Ends === */

/* === Reviews Start === */
app.post(
  '/reviews/generate',
  [requestId, verifyTokenMiddleware],
  Reviews.generate
)
/* === Review End === */

/* === Meta Start === */
app.post(
  '/meta/basicMetadata',
  [requestId, verifyTokenMiddleware],
  basicMetadataRoute
)
/* === Meta End === */

export default app
