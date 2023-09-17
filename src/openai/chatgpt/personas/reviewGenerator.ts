import logger from '../../../logger'

export const reviewGenerator = (
  productTitle: string,
  productDescription: string,
  csvFormat: string,
  requestId: string
) => {
  const type = 'Personas.reviewGenerator'
  try {
    logger.debug({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    const prompt: string = `
        Product Name: ${productTitle}
        Product Title: ${productDescription}

        Generate 10 unique and engaging product reviews for the given product name and description in CSV format: ${csvFormat}
    `
    logger.debug({
      type: type,
      message: `${type}: Successfully completed execution.`,
      requestId: requestId,
    })
    return prompt
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
