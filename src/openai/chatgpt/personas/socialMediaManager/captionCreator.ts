import logger from '../../../../logger'

export const captionCreator = (
  productTitle: string,
  productDescription: string,
  requestId: string
) => {
  const type = 'Personas.SocialMediaManager.captionCreator'
  try {
    logger.debug({
      type: type,
      message: `${type}: Starting now.`,
      requestId: requestId,
    })

    const prompt: string = `You are my AI social media manager. I have an amazing product I want to post about on Instagram. 
        The product is called "${productTitle}" and here's a short description: "${productDescription}". 
        I need a compelling caption that will drive traffic, increase sales, and engage my audience. 
        The caption should include relevant trending hashtags and emojis to make it stand out. 
        Get creative and help me create a post that captures attention and converts followers into customers. 💥🚀
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
