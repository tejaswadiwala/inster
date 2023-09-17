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

        Generate 10 unique and engaging product reviews from the above given description of the product.
        
        Please create a typescript object in this ${csvFormat}. Make sure the keys don't have any spaces.
        If you cannot fill in any field, just keep it an empty string ''.

        Following are the points to keep in mind: 
        1. The reviews should be backdated, select any random date after 05/30/2023 till today's date, dont only select dates of october. 
        2. Also all the emails should be legit emails, they should only end in @gmail.com, @yahoo.com, @hotmail.com.
        3. 60% of the names should be Indian and other 40% Non-Indians. 
        4. The review should be concise with a maximum 20-50 characters, and make sure reviews are not repeated.
        5. Please write a review how normal humans write it. 
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
