# TelegramMailingService SDK utility: make_context
require_relative '../core/context'
module TelegramMailingServiceUtilities
  MakeContext = ->(ctxmap, basectx) {
    TelegramMailingServiceContext.new(ctxmap, basectx)
  }
end
