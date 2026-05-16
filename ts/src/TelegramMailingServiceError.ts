
import { Context } from './Context'


class TelegramMailingServiceError extends Error {

  isTelegramMailingServiceError = true

  sdk = 'TelegramMailingService'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  TelegramMailingServiceError
}

