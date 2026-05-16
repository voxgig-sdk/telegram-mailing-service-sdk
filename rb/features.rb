# TelegramMailingService SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module TelegramMailingServiceFeatures
  def self.make_feature(name)
    case name
    when "base"
      TelegramMailingServiceBaseFeature.new
    when "test"
      TelegramMailingServiceTestFeature.new
    else
      TelegramMailingServiceBaseFeature.new
    end
  end
end
