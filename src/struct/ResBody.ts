export default class ResBody {
  success: boolean
  data: any
  msg: string
  constructor({ success = true, data = {}, msg = "" }) {
    this.success = success
    this.data = data
    this.msg = msg
  }
}
