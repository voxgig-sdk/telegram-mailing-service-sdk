-- TelegramMailingService SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "TelegramMailingService",
      slug = "telegram-mailing-service",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://app.telegasend.ru/api/v1",
      auth = {
        prefix = "",
        name = "X-API-Key",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["mailing"] = {},
      },
    },
    entity = {
      ["mailing"] = {
        ["fields"] = {
          {
            ["name"] = "attachments",
            ["title"] = "Attachments",
            ["type"] = "`$ARRAY`",
            ["short"] = "Optional list of file URLs to attach",
          },
          {
            ["name"] = "completedAt",
            ["title"] = "Completed At",
            ["type"] = "`$STRING`",
            ["short"] = "Timestamp when the mailing was completed",
            ["format"] = "date-time",
          },
          {
            ["name"] = "createdAt",
            ["title"] = "Created At",
            ["type"] = "`$STRING`",
            ["short"] = "Timestamp when the mailing was created",
            ["format"] = "date-time",
          },
          {
            ["name"] = "failedCount",
            ["title"] = "Failed Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of messages that failed to send",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Unique identifier of the mailing",
            ["format"] = "uuid",
          },
          {
            ["name"] = "message",
            ["title"] = "Message",
            ["type"] = "`$STRING`",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Message content",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Name of the mailing campaign",
          },
          {
            ["name"] = "parseMode",
            ["title"] = "Parse Mode",
            ["type"] = "`$STRING`",
            ["short"] = "Message formatting mode",
          },
          {
            ["name"] = "recipients",
            ["title"] = "Recipients",
            ["type"] = "`$ARRAY`",
            ["req"] = true,
            ["short"] = "List of Telegram usernames or chat IDs",
          },
          {
            ["name"] = "scheduleTime",
            ["title"] = "Schedule Time",
            ["type"] = "`$STRING`",
            ["short"] = "Scheduled time for the mailing",
            ["format"] = "date-time",
          },
          {
            ["name"] = "sentCount",
            ["title"] = "Sent Count",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of messages successfully sent",
          },
          {
            ["name"] = "status",
            ["title"] = "Status",
            ["type"] = "`$STRING`",
            ["short"] = "Current status of the mailing",
          },
          {
            ["name"] = "totalRecipients",
            ["title"] = "Total Recipients",
            ["type"] = "`$INTEGER`",
            ["short"] = "Total number of recipients",
          },
          {
            ["name"] = "updatedAt",
            ["title"] = "Updated At",
            ["type"] = "`$STRING`",
            ["short"] = "Timestamp when the mailing was last updated",
            ["format"] = "date-time",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "mailing",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/mailings",
                ["segments"] = {
                  {
                    ["lit"] = "mailings",
                  },
                },
                ["parts"] = {
                  "mailings",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/mailings",
                ["segments"] = {
                  {
                    ["lit"] = "mailings",
                  },
                },
                ["parts"] = {
                  "mailings",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 20,
                    },
                    {
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 0,
                    },
                    {
                      ["name"] = "status",
                      ["orig"] = "status",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                    "offset",
                    "status",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/mailings/{mailingId}",
                ["segments"] = {
                  {
                    ["lit"] = "mailings",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "mailings",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["mailingId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "mailing_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/mailings/{mailingId}",
                ["segments"] = {
                  {
                    ["lit"] = "mailings",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "mailings",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["mailingId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "mailing_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
