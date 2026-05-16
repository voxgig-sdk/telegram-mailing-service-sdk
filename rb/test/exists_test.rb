# TelegramMailingService SDK exists test

require "minitest/autorun"
require_relative "../TelegramMailingService_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = TelegramMailingServiceSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
