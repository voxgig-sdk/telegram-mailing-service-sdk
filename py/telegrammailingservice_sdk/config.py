# TelegramMailingService SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "TelegramMailingService",
            "slug": "telegram-mailing-service",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://app.telegasend.ru/api/v1",
            "auth": {
                "prefix": "",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "mailing": {},
            },
        },
        "entity": {
      "mailing": {
        "fields": [
          {
            "name": "attachments",
            "short": "Optional list of file URLs to attach",
            "type": "`$ARRAY`",
          },
          {
            "format": "date-time",
            "name": "completedAt",
            "short": "Timestamp when the mailing was completed",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "createdAt",
            "short": "Timestamp when the mailing was created",
            "type": "`$STRING`",
          },
          {
            "name": "failedCount",
            "short": "Number of messages that failed to send",
            "type": "`$INTEGER`",
          },
          {
            "format": "uuid",
            "name": "id",
            "short": "Unique identifier of the mailing",
            "type": "`$STRING`",
          },
          {
            "name": "message",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Message content",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Name of the mailing campaign",
            "type": "`$STRING`",
          },
          {
            "name": "parseMode",
            "short": "Message formatting mode",
            "type": "`$STRING`",
          },
          {
            "name": "recipients",
            "req": True,
            "short": "List of Telegram usernames or chat IDs",
            "type": "`$ARRAY`",
          },
          {
            "format": "date-time",
            "name": "scheduleTime",
            "short": "Scheduled time for the mailing",
            "type": "`$STRING`",
          },
          {
            "name": "sentCount",
            "short": "Number of messages successfully sent",
            "type": "`$INTEGER`",
          },
          {
            "name": "status",
            "short": "Current status of the mailing",
            "type": "`$STRING`",
          },
          {
            "name": "totalRecipients",
            "short": "Total number of recipients",
            "type": "`$INTEGER`",
          },
          {
            "format": "date-time",
            "name": "updatedAt",
            "short": "Timestamp when the mailing was last updated",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "mailing",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/mailings",
                "segments": [
                  {
                    "lit": "mailings",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "mailings",
                ],
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "kind": "query",
                      "name": "status",
                      "orig": "status",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/mailings",
                "segments": [
                  {
                    "lit": "mailings",
                  },
                ],
                "select": {
                  "exist": [
                    "limit",
                    "offset",
                    "status",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.data`",
                },
                "parts": [
                  "mailings",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "mailing_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/mailings/{mailingId}",
                "rename": {
                  "param": {
                    "mailingId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "mailings",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "mailings",
                  "{id}",
                ],
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "mailing_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/mailings/{mailingId}",
                "rename": {
                  "param": {
                    "mailingId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "mailings",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "mailings",
                  "{id}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
