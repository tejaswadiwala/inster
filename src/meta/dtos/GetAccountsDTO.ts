// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface GetAccountsDTO {
  data: GetAccountsData[]
  paging: {
    cursors: {
      before: string
      after: string
    }
  }
}

interface GetAccountsData {
  access_token: string
  category: string
  category_list: GetAccountsCategory[]
  name: string
  id: string
  tasks: string[]
}

interface GetAccountsCategory {
  id: string
  name: string
}
