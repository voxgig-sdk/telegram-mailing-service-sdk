-- TelegramMailingService SDK error

local TelegramMailingServiceError = {}
TelegramMailingServiceError.__index = TelegramMailingServiceError


function TelegramMailingServiceError.new(code, msg, ctx)
  local self = setmetatable({}, TelegramMailingServiceError)
  self.is_sdk_error = true
  self.sdk = "TelegramMailingService"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function TelegramMailingServiceError:error()
  return self.msg
end


function TelegramMailingServiceError:__tostring()
  return self.msg
end


return TelegramMailingServiceError
