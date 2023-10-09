import { Response } from 'express'
import logger, { serializeError } from '../../logger'
import { getBasicMetadata } from '../../meta/getBasicMetadata'
import { CustomRequest } from '../../middleware/requestId'

export const basicMetadataRoute = async (req: CustomRequest, res: Response) => {
  const type = 'getBasicMetadataRoute'
  try {
    const basicMetadataRequest = req.body
    const data = await getBasicMetadata(basicMetadataRequest, req.requestId!)
    return res.status(200).send({ data: data, requestId: req.requestId })
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
