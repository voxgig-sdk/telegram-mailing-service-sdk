# Mailing entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from telegrammailingservice_sdk import TelegramMailingServiceSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestMailingEntity:

    def test_should_create_instance(self):
        testsdk = TelegramMailingServiceSDK.test(None, None)
        ent = testsdk.Mailing(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _mailing_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["create", "list", "load", "remove"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "mailing." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set TELEGRAMMAILINGSERVICE_TEST_MAILING_ENTID JSON to run live")
        client = setup["client"]

        # CREATE
        mailing_ref01_ent = client.Mailing(None)
        mailing_ref01_data = helpers.to_map(vs.getprop(
            vs.getpath(setup["data"], "new.mailing"), "mailing_ref01"))

        mailing_ref01_data = helpers.to_map(mailing_ref01_ent.create(mailing_ref01_data, None))
        assert mailing_ref01_data is not None
        assert mailing_ref01_data["id"] is not None

        # LIST
        mailing_ref01_match = {}

        mailing_ref01_list_result = mailing_ref01_ent.list(mailing_ref01_match, None)
        assert isinstance(mailing_ref01_list_result, list)

        found_item = vs.select(
            runner.entity_list_to_data(mailing_ref01_list_result),
            {"id": mailing_ref01_data["id"]})
        assert not vs.isempty(found_item)

        # LOAD
        mailing_ref01_match_dt0 = {
            "id": mailing_ref01_data["id"],
        }
        mailing_ref01_data_dt0_loaded = mailing_ref01_ent.load(mailing_ref01_match_dt0, None)
        mailing_ref01_data_dt0_load_result = helpers.to_map(mailing_ref01_data_dt0_loaded)
        assert mailing_ref01_data_dt0_load_result is not None
        assert mailing_ref01_data_dt0_load_result["id"] == mailing_ref01_data["id"]

        # REMOVE
        mailing_ref01_match_rm0 = {
            "id": mailing_ref01_data["id"],
        }
        mailing_ref01_ent.remove(mailing_ref01_match_rm0, None)

        # LIST
        mailing_ref01_match_rt0 = {}

        mailing_ref01_list_rt0_result = mailing_ref01_ent.list(mailing_ref01_match_rt0, None)
        assert isinstance(mailing_ref01_list_rt0_result, list)

        not_found_item = vs.select(
            runner.entity_list_to_data(mailing_ref01_list_rt0_result),
            {"id": mailing_ref01_data["id"]})
        assert vs.isempty(not_found_item)



def _mailing_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/mailing/MailingTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = TelegramMailingServiceSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["mailing01", "mailing02", "mailing03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "TELEGRAMMAILINGSERVICE_TEST_MAILING_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "TELEGRAMMAILINGSERVICE_TEST_MAILING_ENTID": idmap,
        "TELEGRAMMAILINGSERVICE_TEST_LIVE": "FALSE",
        "TELEGRAMMAILINGSERVICE_TEST_EXPLAIN": "FALSE",
        "TELEGRAMMAILINGSERVICE_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("TELEGRAMMAILINGSERVICE_TEST_MAILING_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("TELEGRAMMAILINGSERVICE_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("TELEGRAMMAILINGSERVICE_APIKEY"),
            },
            extra or {},
        ])
        client = TelegramMailingServiceSDK(helpers.to_map(merged_opts))

    _live = env.get("TELEGRAMMAILINGSERVICE_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("TELEGRAMMAILINGSERVICE_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
