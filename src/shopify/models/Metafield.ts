export type Metafield = {
  id: number
  namespace: string
  key: string
  value: string
  description: string | null
  owner_id: number
  created_at: string
  updated_at: string
  owner_resource: string
  type: string
  admin_graphql_api_id: string
}
