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
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://app.telegasend.ru/api/v1",
      auth = {
        prefix = "",
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
            ["short"] = "Optional list of file URLs to attach",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "completedAt",
            ["short"] = "Timestamp when the mailing was completed",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "createdAt",
            ["short"] = "Timestamp when the mailing was created",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "failedCount",
            ["short"] = "Number of messages that failed to send",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "id",
            ["short"] = "Unique identifier of the mailing",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "message",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Message content",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Name of the mailing campaign",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "parseMode",
            ["short"] = "Message formatting mode",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "recipients",
            ["req"] = true,
            ["short"] = "List of Telegram usernames or chat IDs",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "scheduleTime",
            ["short"] = "Scheduled time for the mailing",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "sentCount",
            ["short"] = "Number of messages successfully sent",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "status",
            ["short"] = "Current status of the mailing",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "totalRecipients",
            ["short"] = "Total number of recipients",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "updatedAt",
            ["short"] = "Timestamp when the mailing was last updated",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "mailing",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/mailings",
                ["parts"] = {
                  "mailings",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 20,
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "offset",
                      ["orig"] = "offset",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "status",
                      ["orig"] = "status",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/mailings",
                ["parts"] = {
                  "mailings",
                },
                ["select"] = {
                  ["exist"] = {
                    "limit",
                    "offset",
                    "status",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.data`",
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "mailing_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/mailings/{mailingId}",
                ["parts"] = {
                  "mailings",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["mailingId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
          ["remove"] = {
            ["input"] = "data",
            ["name"] = "remove",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "mailing_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "DELETE",
                ["orig"] = "/mailings/{mailingId}",
                ["parts"] = {
                  "mailings",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["mailingId"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
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
