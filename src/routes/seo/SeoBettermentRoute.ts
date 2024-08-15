import { Response } from 'express'
import logger, { serializeError } from '../../logger'
import { CustomRequest } from '../../middleware/requestId'
import SeoBettermentService from '../../services/seo/SeoBettermentService'
import { SeoBettermentRouteBody } from '../../services/seo/models/SeoBettermentRouteBody'

class SeoBettermentRoute {
  public static async routing(req: CustomRequest, res: Response) {
    const type = 'SeoBettermentRoute.routing'
    try {
      const seoBettermentService = new SeoBettermentService()
      const body: SeoBettermentRouteBody = req.body
      const response = await seoBettermentService.start(
        req.requestId as string,
        body
      )

      return res.status(200).send({ data: response, requestId: req.requestId })
    } catch (error) {
      logger.error({
        message: `${type}: Error occurred.`,
        type: type,
        requestId: req.requestId,
        error: serializeError(error),
      })
      return res.status(500).send({ error: error, requestId: req.requestId })
    }
  }
}

export default SeoBettermentRoute
