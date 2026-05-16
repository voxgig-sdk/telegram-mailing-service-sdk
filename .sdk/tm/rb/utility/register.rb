# TelegramMailingService SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

TelegramMailingServiceUtility.registrar = ->(u) {
  u.clean = TelegramMailingServiceUtilities::Clean
  u.done = TelegramMailingServiceUtilities::Done
  u.make_error = TelegramMailingServiceUtilities::MakeError
  u.feature_add = TelegramMailingServiceUtilities::FeatureAdd
  u.feature_hook = TelegramMailingServiceUtilities::FeatureHook
  u.feature_init = TelegramMailingServiceUtilities::FeatureInit
  u.fetcher = TelegramMailingServiceUtilities::Fetcher
  u.make_fetch_def = TelegramMailingServiceUtilities::MakeFetchDef
  u.make_context = TelegramMailingServiceUtilities::MakeContext
  u.make_options = TelegramMailingServiceUtilities::MakeOptions
  u.make_request = TelegramMailingServiceUtilities::MakeRequest
  u.make_response = TelegramMailingServiceUtilities::MakeResponse
  u.make_result = TelegramMailingServiceUtilities::MakeResult
  u.make_point = TelegramMailingServiceUtilities::MakePoint
  u.make_spec = TelegramMailingServiceUtilities::MakeSpec
  u.make_url = TelegramMailingServiceUtilities::MakeUrl
  u.param = TelegramMailingServiceUtilities::Param
  u.prepare_auth = TelegramMailingServiceUtilities::PrepareAuth
  u.prepare_body = TelegramMailingServiceUtilities::PrepareBody
  u.prepare_headers = TelegramMailingServiceUtilities::PrepareHeaders
  u.prepare_method = TelegramMailingServiceUtilities::PrepareMethod
  u.prepare_params = TelegramMailingServiceUtilities::PrepareParams
  u.prepare_path = TelegramMailingServiceUtilities::PreparePath
  u.prepare_query = TelegramMailingServiceUtilities::PrepareQuery
  u.result_basic = TelegramMailingServiceUtilities::ResultBasic
  u.result_body = TelegramMailingServiceUtilities::ResultBody
  u.result_headers = TelegramMailingServiceUtilities::ResultHeaders
  u.transform_request = TelegramMailingServiceUtilities::TransformRequest
  u.transform_response = TelegramMailingServiceUtilities::TransformResponse
}
