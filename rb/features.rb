# TelegramMailingService SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module TelegramMailingServiceFeatures
  def self.make_feature(name)
    case name
    when "base"
      TelegramMailingServiceBaseFeature.new
    when "ratelimit"
      TelegramMailingServiceRatelimitFeature.new
    when "retry"
      TelegramMailingServiceRetryFeature.new
    when "test"
      TelegramMailingServiceTestFeature.new
    when "timeout"
      TelegramMailingServiceTimeoutFeature.new
    else
      TelegramMailingServiceBaseFeature.new
    end
  end
end
