export type UpdateProduct = {
  product: {
    id: number
    body_html: string
    handle: string
    title: string
    images: {
      id: number
      alt: string
    }[]
  }
}
