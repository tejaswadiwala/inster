import logger from '../../logger'
import OpenAIController from '../../openai/OpenAIController'
import { productFeatureGenerator } from '../../openai/chatgpt/personas/productFeatureGenerator'
import { createMetafieldById } from '../../shopify/createMetafieldById'
import { UpdateMetafield } from '../../shopify/dtos/UpdateMetafield'
import { UpdateProduct } from '../../shopify/dtos/UpdateProduct'
import { getMetafieldByProductId } from '../../shopify/getMetafieldByProductId'
import { Metafields } from '../../shopify/models/Metafields'
import { Product } from '../../shopify/models/Product'
import { Image } from '../../shopify/models/Product'
import { updateProductById } from '../../shopify/updateProductById'
import { ProductFeaturesChatGpt } from './models/ProductFeaturesChatGpt'
import { SeoBettermentRouteBody } from './models/SeoBettermentRouteBody'

export async function processProducts(
  products: Product[],
  body: SeoBettermentRouteBody,
  requestId: string
) {
  const type = 'seo.processProducts'
  for (const product of products) {
    logger.info({
      message: `${type}: Seo Enhancement starting for product - ${product.id}.`,
      type: type,
      requestId: requestId,
    })

    if (body.skipProductIds) {
      for (const skipProductId of body.skipProductIds) {
        logger.info({
          message: `${type}: Product id - ${skipProductId} in skipProductIds, skipping it.`,
          type: type,
          requestId: requestId,
        })
        continue
      }
      continue
    }

    if (product.product_type != 'Oversized T-shirt') {
      logger.info({
        message: `${type}: Product type - ${product.product_type} not supported.`,
        type: type,
        requestId: requestId,
      })
      continue
    }

    const metafields = await getMetafieldByProductId(product.id, requestId)

    let productName
    try {
      productName = getProductNameFromMetafield(metafields, product.id)
    } catch (error) {
      if (
        error instanceof Error &&
        error.message == `Name not present for this product - ${product.id}`
      ) {
        logger.info({
          message: `${type}: Name not present for this product - ${product.id}.`,
          type: type,
          requestId: requestId,
        })
        continue
      }
      throw error
    }

    const productFeaturesChatGpt: ProductFeaturesChatGpt = {
      productName: productName,
      color: extractColor(product.title),
      keywords: body.keywords,
    }

    const productTitle = getProductTitle(productFeaturesChatGpt)

    await updateMetafieldWithChatGptResponse(
      productFeaturesChatGpt,
      productTitle,
      product.id,
      requestId
    )

    const updateProduct: UpdateProduct = {
      product: {
        id: product.id,
        handle: getUrlHandle(productTitle),
        title: productTitle,
        body_html: getProductDescription(),
        images: getImagesAltText(product.images, productTitle),
      },
    }

    await updateProductById(product.id, updateProduct, requestId)
  }
}

function getImagesAltText(images: Image[], productTitle: string) {
  const imagesAltText = []
  for (const image of images) {
    imagesAltText.push({
      id: image.id,
      alt: productTitle,
    })
  }
  return imagesAltText
}

function getProductDescription() {
  return `
  <div class="flex flex-grow flex-col max-w-full">
  <div class="min-h-[20px] text-message flex w-full flex-col items-end gap-2 whitespace-pre-wrap break-words [.text-message+&amp;]:mt-5 overflow-x-auto" dir="auto" data-message-id="9ef9cd7f-ea54-4ca7-be0f-e65488b78b02" data-message-author-role="assistant">
  <div class="flex w-full flex-col gap-1 empty:hidden first:pt-[3px]">
  <div class="markdown prose w-full break-words dark:prose-invert light">
  <ul>
  <li>100% Cotton</li>
  <li>240 gsm heavy-weight material</li>
  <li>Premium print in front and back</li>
  <li>Go one size down for perfect fitting, and size up if you want extra oversized fit</li>
  </ul>
  <p><strong>Wash Care</strong></p>
  <ul>
  <li>Machine wash reverse only</li>
  <li>Use cold water for washing</li>
  </ul>
  <p>&nbsp;</p>
  </div>
  </div>
  </div>
  </div>
  <ul data-mce-fragment="1">
  <li data-mce-fragment="1">
  <div data-mce-fragment="1" id="tab-product-details" class="tab-content">
  <div data-mce-fragment="1" id="tab-product-details-mobile" class="toggle-content popup-mobile">
  <div data-mce-fragment="1" class="tab-popup-content" style="text-align: left;">
  <p><b data-mce-fragment="1"><img src="https://cdn.shopify.com/s/files/1/0671/3593/0617/files/SIZECHART_2_1_4ab15ae1-294a-45f6-804c-5516343a5436.png?v=1711078857" alt="oversized black t shirt mens oversized blue t shirt red oversized t shirt green oversized t shirt pink oversized t shirt brown oversized t shirt oversized jersey t shirt oversized orange t shirt plain black oversized t shirt buy oversized t shirt myntra oversized t shirt oversized t shirt mens black vintage oversized t shirts oversized t shirt mens white oversized cotton t shirt oversized t shirt mens myntra where can i buy oversized t shirts" style="float: none;"></b></p>
  </div>
  </div>
  </div>
  </li>
  </ul>`
}

function getMetaDescription(title: string) {
  const metaDescription = `${title}. 100% Cotton, Premium 240 GSM Fabric, Premium Print on Front and Back, Made to Order in India, Machine Reverse Wash Only. `
  return metaDescription
}

function getUrlHandle(title: string): string {
  return title
    .toLowerCase() // Convert all characters to lowercase
    .replace(/\s*\|\s*/g, '-') // Replace ' | ' with '-'
    .replace(/\s+/g, '-') // Replace spaces with '-'
    .replace(/[^a-z0-9\-]/g, '') // Remove any non-alphanumeric characters except hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
    .replace(/^-|-$/g, '') // Remove leading or trailing hyphens
}

function getProductTitle(
  productFeaturesChatGpt: ProductFeaturesChatGpt
): string {
  const { productName, color, keywords } = productFeaturesChatGpt

  let productTitle = productName

  if (color) {
    productTitle += ` ${color}`
  }

  if (keywords.length > 0) {
    const keywordsString = keywords.join(' | ')
    productTitle += ` ${keywordsString}`
  }

  return productTitle
}

function getProductNameFromMetafield(
  metafields: Metafields,
  productId: number
): string {
  for (const metafield of metafields.metafields) {
    if (metafield.key == 'productname') {
      return metafield.value
    }
  }
  throw new Error(`Name not present for this product - ${productId}`)
}

async function createProductFeaturesFromChatGpt(
  productFeaturesChatGpt: ProductFeaturesChatGpt,
  requestId: string
) {
  const openaiController = new OpenAIController(requestId)
  const chatGptGeneratedProductFeatures =
    await openaiController.chatGPT.getResponse(
      productFeatureGenerator(
        productFeaturesChatGpt.productName,
        productFeaturesChatGpt.keywords,
        requestId
      )
    )
  return chatGptGeneratedProductFeatures
}

async function updateMetafieldWithChatGptResponse(
  productFeaturesChatGpt: ProductFeaturesChatGpt,
  productTitle: string,
  id: number,
  requestId: string
) {
  const productFeaturesData: UpdateMetafield = {
    metafield: {
      value: await createProductFeaturesFromChatGpt(
        productFeaturesChatGpt,
        requestId
      ),
      key: 'product_features',
      namespace: 'custom',
      type: 'multi_line_text_field',
    },
  }

  await createMetafieldById(id, productFeaturesData, requestId)

  const metaDescriptionData: UpdateMetafield = {
    metafield: {
      value: getMetaDescription(productTitle),
      key: 'description_tag',
      namespace: 'global',
      type: 'multi_line_text_field',
    },
  }

  await createMetafieldById(id, metaDescriptionData, requestId)
}

function extractColor(title: string): string | null {
  const colors = [
    'Black',
    'White',
    'Blue',
    'Forest Green',
    'Beige',
    'Red',
    'Maroon',
  ]

  const lowerTitle = title.toLowerCase()

  for (const color of colors) {
    const lowerColor = color.toLowerCase()
    if (lowerTitle.includes(lowerColor)) {
      return color
    }
  }

  return null
}
