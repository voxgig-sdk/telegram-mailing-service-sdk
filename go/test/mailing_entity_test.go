package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/telegram-mailing-service-sdk/go"
	"github.com/voxgig-sdk/telegram-mailing-service-sdk/go/core"

	vs "github.com/voxgig-sdk/telegram-mailing-service-sdk/go/utility/struct"
)

func TestMailingEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Mailing(nil)
		if ent == nil {
			t.Fatal("expected non-nil MailingEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := mailingBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create", "list", "load", "remove"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "mailing." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set TELEGRAMMAILINGSERVICE_TEST_MAILING_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		mailingRef01Ent := client.Mailing(nil)
		mailingRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "mailing"}, setup.data), "mailing_ref01"))

		mailingRef01DataResult, err := mailingRef01Ent.Create(mailingRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		mailingRef01Data = core.ToMapAny(mailingRef01DataResult)
		if mailingRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}
		if mailingRef01Data["id"] == nil {
			t.Fatal("expected created entity to have an id")
		}

		// LIST
		mailingRef01Match := map[string]any{}

		mailingRef01ListResult, err := mailingRef01Ent.List(mailingRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		mailingRef01List, mailingRef01ListOk := mailingRef01ListResult.([]any)
		if !mailingRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", mailingRef01ListResult)
		}

		foundItem := vs.Select(entityListToData(mailingRef01List), map[string]any{"id": mailingRef01Data["id"]})
		if vs.IsEmpty(foundItem) {
			t.Fatal("expected to find created entity in list")
		}

		// LOAD
		mailingRef01MatchDt0 := map[string]any{
			"id": mailingRef01Data["id"],
		}
		mailingRef01DataDt0Loaded, err := mailingRef01Ent.Load(mailingRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		mailingRef01DataDt0LoadResult := core.ToMapAny(mailingRef01DataDt0Loaded)
		if mailingRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if mailingRef01DataDt0LoadResult["id"] != mailingRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

		// REMOVE
		mailingRef01MatchRm0 := map[string]any{
			"id": mailingRef01Data["id"],
		}
		_, err = mailingRef01Ent.Remove(mailingRef01MatchRm0, nil)
		if err != nil {
			t.Fatalf("remove failed: %v", err)
		}

		// LIST
		mailingRef01MatchRt0 := map[string]any{}

		mailingRef01ListRt0Result, err := mailingRef01Ent.List(mailingRef01MatchRt0, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		mailingRef01ListRt0, mailingRef01ListRt0Ok := mailingRef01ListRt0Result.([]any)
		if !mailingRef01ListRt0Ok {
			t.Fatalf("expected list result to be an array, got %T", mailingRef01ListRt0Result)
		}

		notFoundItem := vs.Select(entityListToData(mailingRef01ListRt0), map[string]any{"id": mailingRef01Data["id"]})
		if !vs.IsEmpty(notFoundItem) {
			t.Fatal("expected removed entity to not be in list")
		}

	})
}

func mailingBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "mailing", "MailingTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read mailing test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse mailing test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"mailing01", "mailing02", "mailing03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("TELEGRAMMAILINGSERVICE_TEST_MAILING_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"TELEGRAMMAILINGSERVICE_TEST_MAILING_ENTID": idmap,
		"TELEGRAMMAILINGSERVICE_TEST_LIVE":      "FALSE",
		"TELEGRAMMAILINGSERVICE_TEST_EXPLAIN":   "FALSE",
		"TELEGRAMMAILINGSERVICE_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["TELEGRAMMAILINGSERVICE_TEST_MAILING_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["TELEGRAMMAILINGSERVICE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["TELEGRAMMAILINGSERVICE_APIKEY"],
			},
			extra,
		})
		client = sdk.NewTelegramMailingServiceSDK(core.ToMapAny(mergedOpts))
	}

	live := env["TELEGRAMMAILINGSERVICE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["TELEGRAMMAILINGSERVICE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
