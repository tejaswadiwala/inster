import { Response } from 'express'
import logger, { serializeError } from '../../logger'
import { CustomRequest } from '../../middleware/requestId'
import ReviewsService from '../../services/reviews/ReviewsService'

class Reviews {
  public static async generate(req: CustomRequest, res: Response) {
    const type = 'Reviews.generate'
    try {
      const generateReviewsRequest = req.body
      ReviewsService.generate(generateReviewsRequest, req.requestId as string)
      return res.status(200).send({ data: 'ok', requestId: req.requestId })
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

export default Reviews
