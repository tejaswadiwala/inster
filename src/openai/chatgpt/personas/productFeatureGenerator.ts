import logger, { serializeError } from '../../../logger'

export const productFeatureGenerator = (
  title: string,
  keywords: string[],
  requestId: string
) => {
  const type = 'Personas.productFeatureGenerator'
  try {
    logger.debug({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    const prompt: string = `
        I want to rank on first page of google and here are my keywords: ${keywords}. 
				write me blog post with engaging title for my product title ${title} and must use these keywords for 30 times.
				i want to increase the keyword count of all of my keywords to upto 30 times. 
				add product description. give me more bullet points and paragraph and readable. Please dont give any information
        on how to use this blog post.`

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
      error: serializeError(error),
      requestId: requestId,
    })
    throw error
  }
}
