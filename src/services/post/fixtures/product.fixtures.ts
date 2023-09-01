const product: Product = {
  id: 12345,
  title: 'Test Title',
  body_html: 'Test Description',
  vendor: 'Example Vendor',
  product_type: 'Example Product Type',
  created_at: '2023-08-15T10:00:00Z',
  handle: 'example-product-handle',
  updated_at: '2023-08-16T15:30:00Z',
  published_at: '2023-08-15T12:00:00Z',
  template_suffix: '',
  status: 'active',
  published_scope: 'web',
  tags: 'tag1, tag2, tag3',
  admin_graphql_api_id: 'abc123',
  variants: [
    {
      id: 101,
      product_id: 12345,
      title: 'Variant 1',
      price: '29.99',
      sku: 'VARIANT1SKU',
      position: 1,
      inventory_policy: 'continue',
      compare_at_price: '39.99',
      fulfillment_service: 'manual',
      inventory_management: 'shopify',
      option1: 'Size',
      option2: 'Color',
      option3: null,
      created_at: '2023-08-15T10:05:00Z',
      updated_at: '2023-08-16T11:30:00Z',
      taxable: true,
      barcode: '123456789',
      grams: 500,
      image_id: 201,
      weight: 0.5,
      weight_unit: 'kg',
      inventory_item_id: 301,
      inventory_quantity: 50,
      old_inventory_quantity: 60,
      requires_shipping: true,
      admin_graphql_api_id: 'variant-abc123',
    },
    // Add more variant entries as needed
  ],
  options: [
    {
      id: 201,
      product_id: 12345,
      name: 'Size',
      position: 1,
      values: ['Small', 'Medium', 'Large'],
    },
    {
      id: 202,
      product_id: 12345,
      name: 'Color',
      position: 2,
      values: ['Red', 'Blue', 'Green'],
    },
    // Add more option entries as needed
  ],
  images: [
    {
      id: 301,
      product_id: 12345,
      position: 1,
      created_at: '2023-08-15T10:10:00Z',
      updated_at: '2023-08-16T09:30:00Z',
      alt: 'Product Image 1',
      width: 800,
      height: 600,
      src: 'test-image-url.jpg',
      variant_ids: [101],
      admin_graphql_api_id: 'image-xyz123',
    },
    // Add more image entries as needed
  ],
  image: {
    id: 401,
    product_id: 12345,
    position: 1,
    created_at: '2023-08-15T10:20:00Z',
    updated_at: '2023-08-16T08:30:00Z',
    alt: 'Product Image',
    width: 1000,
    height: 800,
    src: 'main-image-url.jpg',
    variant_ids: [],
    admin_graphql_api_id: 'main-image-pqr456',
  },
}

export default product
