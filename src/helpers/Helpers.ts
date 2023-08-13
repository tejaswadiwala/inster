import AxiosHelper from './axios/AxiosHelper'

class Helpers {
  private requestId: string
  public axiosHelper: AxiosHelper

  constructor(requestId: string) {
    this.requestId = requestId
    this.axiosHelper = new AxiosHelper(this.requestId)
  }
}

export default Helpers
