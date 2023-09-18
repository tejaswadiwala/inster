import logger from '../../../logger'
import DateHelper from '../../../services/helpers/Date'
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
    const todayInDDMMYYYFormat = DateHelper.getInMMDDYYYFormat(today)

    const prompt: string = `
        Product Name: ${product.title}
        Product Title: ${product.body_html}
        Product Id: ${product.id}
        Product Handle: ${product.handle}

        Generate 10 unique and engaging product reviews from the above given description of the product.

        Following are the points to keep in mind: 
        1. The reviews should be backdated, select any random date after 05/30/2023 till ${todayInDDMMYYYFormat}, dont only select dates of october. 
        2. Also all the emails should not disclose personal information, it should start with first name and then have * till .com.
        3. 60% of the names should be Indian and other 40% Non-Indians. 
        4. The review should be concise with a maximum 20-50 characters, and make sure reviews are not repeated.
        5. Please write a review how normal humans write it.
        6. Please do not use fake names like John Doe, which everyone knows. 
        7. Make sure you write t-shirts and not shirts.

        Please return a typescript object in this ${csvFormat}. Make sure the keys don't have any spaces.
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
