# Mailing entity test

require "minitest/autorun"
require "json"
require_relative "../TelegramMailingService_sdk"
require_relative "runner"

class MailingEntityTest < Minitest::Test
  def test_create_instance
    testsdk = TelegramMailingServiceSDK.test(nil, nil)
    ent = testsdk.Mailing(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = mailing_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["create", "list", "load", "remove"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "mailing." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set TELEGRAMMAILINGSERVICE_TEST_MAILING_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # CREATE
    mailing_ref01_ent = client.Mailing(nil)
    mailing_ref01_data = Helpers.to_map(Vs.getprop(
      Vs.getpath(setup[:data], "new.mailing"), "mailing_ref01"))

    mailing_ref01_data_result, err = mailing_ref01_ent.create(mailing_ref01_data, nil)
    assert_nil err
    mailing_ref01_data = Helpers.to_map(mailing_ref01_data_result)
    assert !mailing_ref01_data.nil?
    assert !mailing_ref01_data["id"].nil?

    # LIST
    mailing_ref01_match = {}

    mailing_ref01_list_result, err = mailing_ref01_ent.list(mailing_ref01_match, nil)
    assert_nil err
    assert mailing_ref01_list_result.is_a?(Array)

    found_item = Vs.select(
      Runner.entity_list_to_data(mailing_ref01_list_result),
      { "id" => mailing_ref01_data["id"] })
    assert !Vs.isempty(found_item)

    # LOAD
    mailing_ref01_match_dt0 = {
      "id" => mailing_ref01_data["id"],
    }
    mailing_ref01_data_dt0_loaded, err = mailing_ref01_ent.load(mailing_ref01_match_dt0, nil)
    assert_nil err
    mailing_ref01_data_dt0_load_result = Helpers.to_map(mailing_ref01_data_dt0_loaded)
    assert !mailing_ref01_data_dt0_load_result.nil?
    assert_equal mailing_ref01_data_dt0_load_result["id"], mailing_ref01_data["id"]

    # REMOVE
    mailing_ref01_match_rm0 = {
      "id" => mailing_ref01_data["id"],
    }
    _, err = mailing_ref01_ent.remove(mailing_ref01_match_rm0, nil)
    assert_nil err

    # LIST
    mailing_ref01_match_rt0 = {}

    mailing_ref01_list_rt0_result, err = mailing_ref01_ent.list(mailing_ref01_match_rt0, nil)
    assert_nil err
    assert mailing_ref01_list_rt0_result.is_a?(Array)

    not_found_item = Vs.select(
      Runner.entity_list_to_data(mailing_ref01_list_rt0_result),
      { "id" => mailing_ref01_data["id"] })
    assert Vs.isempty(not_found_item)

  end
end

def mailing_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "mailing", "MailingTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = TelegramMailingServiceSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["mailing01", "mailing02", "mailing03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["TELEGRAMMAILINGSERVICE_TEST_MAILING_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "TELEGRAMMAILINGSERVICE_TEST_MAILING_ENTID" => idmap,
    "TELEGRAMMAILINGSERVICE_TEST_LIVE" => "FALSE",
    "TELEGRAMMAILINGSERVICE_TEST_EXPLAIN" => "FALSE",
    "TELEGRAMMAILINGSERVICE_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["TELEGRAMMAILINGSERVICE_TEST_MAILING_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["TELEGRAMMAILINGSERVICE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["TELEGRAMMAILINGSERVICE_APIKEY"],
      },
      extra || {},
    ])
    client = TelegramMailingServiceSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["TELEGRAMMAILINGSERVICE_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["TELEGRAMMAILINGSERVICE_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
