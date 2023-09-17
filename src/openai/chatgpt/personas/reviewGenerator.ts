import logger from '../../../logger'

export const reviewGenerator = (
  product: Product,
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
        Product Name: ${product.title}
        Product Title: ${product.body_html}
        Product Id: ${product.id}
        Product Handle: ${product.handle}

        Generate 10 unique and engaging product reviews from the above given description of the product in CSV format:
        ${csvFormat}
        Following are the points to keep in mind: 
        1. The reviews should be backdated for any random dates after October 4th 2022 till present, also all the emails should be legit emails, 
        they should only end in @gmail.com, @yahoo.com, @hotmail.com: 
        2. 60% of the names should be Indian and other 40% Non-Indians. 
        3. The review should be concise with a maximum 20-50 characters, and make sure reviews are not repeated.
        4. Please write a review how normal humans write it. 
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
