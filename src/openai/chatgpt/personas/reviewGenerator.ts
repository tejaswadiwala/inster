import logger from '../../../logger'
import DateHelper from '../../../services/helpers/Date'
import { getRandomNumberBetween } from '../../../services/helpers/getRandomNumberBetween'
import { Product } from '../../../shopify/models/Product'

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

    const today = new Date()
    const todayInYYYY_MM_DDFormat = DateHelper.getInYYYY_MM_DDFormat(today)
    const numberOfReviewsToBeGenerated = getRandomNumberBetween(50, 100)

    logger.info({
      type: type,
      message: `${type}: Generating ${numberOfReviewsToBeGenerated} reviews.`,
      requestId: requestId,
    })

    const prompt: string = `
        Product Name: ${product.title}
        Product Title: ${product.body_html}
        Product Id: ${product.id}
        Product Handle: ${product.handle}

        Generate ${numberOfReviewsToBeGenerated} unique and engaging product reviews from the above given description of the product.

        Following are the points to keep in mind: 
        1. The reviews should be backdated, select any random date after 02/06/2024 till ${todayInYYYY_MM_DDFormat}, dont only select dates of october. 
        2. Also all the emails should not disclose personal information, it should start with first name and then have * till .com.
        3. All of the names should be Indian, and it should contain First Name and Last Name. 
        4. The review should be concise, and make sure reviews are not repeated.
        5. Please write a review how normal humans write it.
        6. Please do not use fake names like John Doe, which everyone knows. 
        7. Make sure you write t-shirts and not shirts.

        Please return a typescript object in this ${csvFormat}. Make sure the keys don't have any spaces.
        Make sure that the status and product_id are empty. 
        It should be an array of objects of the above type.
        If you cannot fill in any field, just keep it an empty string ''.
        Please dont assign it to a const.
        Make sure to enclose keys in their own string, and values in their own string. 
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
